import { wss } from '@app/api/wss';
import { appendMessage } from '@app/store/slices/chat-slice';
import { setShowOverlay } from '@app/store/slices/connection-slice';
import { store } from '@app/store/store';
import SimplePeer, { SignalData } from 'simple-peer';

import { turn } from './turn';

class WebRtcManager {
  private _defaultConstraints: MediaStreamConstraints = {
    audio: true,
    video: {
      width: 480,
      height: 360,
    },
  };

  private _audioOnlyConstraints: MediaStreamConstraints = {
    audio: true,
    video: false,
  };

  private _localStream!: MediaStream;
  private _peers = new Map<string, SimplePeer.Instance>();
  private _streams = new Map<string, MediaStream>();

  async getLocalPreviewAndInitRoomConnection(
    isRoomHost: boolean,
    identity: string,
    onlyAudio: boolean,
    roomId?: string,
  ) {
    try {
      store.dispatch(setShowOverlay(true));

      await turn.fetchTurnIceServers();

      const stream = await navigator.mediaDevices.getUserMedia(
        !onlyAudio ? this._defaultConstraints : this._audioOnlyConstraints,
      );

      console.log('Successfully received local stream');

      this._localStream = stream;

      this._showLocalVideoPreview(stream);

      if (isRoomHost) {
        wss.createNewRoom(identity, onlyAudio);
      } else if (roomId) {
        wss.joinRoom(identity, onlyAudio, roomId);
      }
    } catch (error) {
      console.log(
        'Error occurred when trying to get an access to local stream',
        error,
      );
    } finally {
      store.dispatch(setShowOverlay(false));
    }
  }

  prepareNewPeerConnection(connUserSocketId: string, isInitiator: boolean) {
    const turnIceServers = turn.getTurnIceServers();

    const peer = new SimplePeer({
      initiator: isInitiator,
      config: {
        iceServers: [
          {
            urls: 'stun:stun.l.google.com:19302',
          },
          ...turnIceServers,
        ],
      },
      stream: this._localStream,
    });

    this._peers.set(connUserSocketId, peer);

    this._peers.get(connUserSocketId)?.on('signal', (data) => {
      wss.signalPeerData(data, connUserSocketId);
    });

    this._peers.get(connUserSocketId)?.on('stream', (stream) => {
      console.log('new stream started');
      this._addStream(stream, connUserSocketId);
      this._streams.set(connUserSocketId, stream);
    });

    this._peers.get(connUserSocketId)?.on('data', (data) => {
      store.dispatch(appendMessage(JSON.parse(data)));
    });
  }

  handleSignalingData(signal: SignalData, connUserSocketId: string) {
    // Add signaling data to peer connection
    this._peers.get(connUserSocketId)?.signal(signal);
  }

  removePeerConnection(disconnUserSocketId: string) {
    const videoContainer = document.getElementById(disconnUserSocketId);
    const videoElement = document.getElementById(
      `${disconnUserSocketId}_video`,
    ) as HTMLVideoElement;

    if (videoContainer && videoElement) {
      (videoElement.srcObject as MediaStream)
        .getTracks()
        .forEach((x) => x.stop());

      videoElement.srcObject = null;
      videoContainer.removeChild(videoElement);
      videoContainer.parentNode?.removeChild(videoContainer);
    }

    if (this._peers.has(disconnUserSocketId)) {
      this._peers.get(disconnUserSocketId)?.destroy();
      this._peers.delete(disconnUserSocketId);
    }
  }

  private _showLocalVideoPreview(stream: MediaStream) {
    // Show local video preview
    const videosContainer = document.getElementById('videos_portal');
    videosContainer?.classList.add('videos_portal_styles');
    if (!videosContainer) {
      return;
    }

    const videoContainer = document.createElement('div');
    videoContainer.classList.add('video_track_container');

    const videoElement = document.createElement('video');
    videoElement.autoplay = true;
    videoElement.muted = true;
    videoElement.srcObject = stream;

    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };

    videoContainer.appendChild(videoElement);

    // check if user connected only with audio
    if (store.getState().connection.connectOnlyWithAudio) {
      videoContainer.appendChild(this._getAudioOnlyLabel());
    }

    videosContainer.appendChild(videoContainer);
  }

  private _addStream(stream: MediaStream, connUserSocketId: string) {
    // Display incoming stream
    const videosContainer = document.getElementById('videos_portal');
    videosContainer?.classList.add('videos_portal_styles');
    if (!videosContainer) {
      return;
    }

    const videoContainer = document.createElement('div');
    videoContainer.id = connUserSocketId;
    videoContainer.classList.add('video_track_container');

    const videoElement = document.createElement('video');
    videoElement.id = `${connUserSocketId}_video`;
    videoElement.autoplay = true;
    videoElement.srcObject = stream;

    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };

    videoElement.addEventListener('click', () => {
      if (videoElement.classList.contains('full_screen')) {
        videoElement.classList.remove('full_screen');
      } else {
        videoElement.classList.add('full_screen');
      }
    });

    videoContainer.appendChild(videoElement);

    // check if user connected only with audio
    const users = store.getState().connection.participants;
    const user = users.find((x) => x.socketId === connUserSocketId);
    if (user && user.onlyAudio) {
      videoContainer.appendChild(this._getAudioOnlyLabel(user.identity));
    } else {
      videoContainer.style.position = 'static';
    }

    videosContainer.appendChild(videoContainer);
  }

  private _getAudioOnlyLabel(identity?: string): HTMLDivElement {
    const labelContainer = document.createElement('div');
    labelContainer.classList.add('label_only_audio_container');

    const label = document.createElement('p');
    label.classList.add('label_only_audio_text');
    label.innerHTML = `Only audio ${identity ? identity : ''}`;

    labelContainer.appendChild(label);
    return labelContainer;
  }

  toggleMic(state: boolean) {
    this._localStream.getAudioTracks().forEach((x) => (x.enabled = state));
  }

  toggleVideo(state: boolean) {
    this._localStream.getVideoTracks().forEach((x) => (x.enabled = state));
  }

  toggleScreenShare(
    isScreenSharingActive: boolean,
    screenSharingStream?: MediaStream,
  ) {
    if (isScreenSharingActive) {
      if (screenSharingStream) {
        this._switchVideoTracks(screenSharingStream);
      }
    } else {
      this._switchVideoTracks(this._localStream);
    }
  }

  private _switchVideoTracks(stream: MediaStream) {
    this._peers.forEach((peer) => {
      const peerStream = (peer as any).streams[0];
      if (!peerStream) {
        return;
      }

      for (const i in peerStream.getTracks()) {
        for (const j in stream.getTracks()) {
          if (peerStream.getTracks()[i].kind !== stream.getTracks()[j].kind) {
            continue;
          }

          console.log('replace', i, j);

          peer.replaceTrack(
            peerStream.getTracks()[i],
            stream.getTracks()[j],
            peerStream,
          );
          break;
        }
      }
    });
  }

  sendMessageUsingDataChannel(content: string) {
    // Get sender identity
    const identity = store.getState().connection.identity || '';

    // Create new message and add to the local store
    store.dispatch(
      appendMessage({ identity, content, messageCreatedByMe: true }),
    );

    // Send message via peer data channel
    this._peers.forEach((peer) => {
      peer.send(
        JSON.stringify({ identity, content, messageCreatedByMe: false }),
      );
    });
  }
}

export const rtc = new WebRtcManager();
