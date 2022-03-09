import SimplePeer, { SignalData } from 'simple-peer';

import { wss } from '@app/api/wss';
import { setShowOverlay } from '@app/store/slices/connection-slice';
import { store } from '@app/store/store';

class WebRtcManager {
  private _defaultConstraints: MediaStreamConstraints = {
    audio: true,
    video: {
      width: 480,
      height: 360,
    },
  };

  private _localStream!: MediaStream;
  private _peers = new Map<string, SimplePeer.Instance>();
  private _streams = new Array<MediaStream>();

  async getLocalPreviewAndInitRoomConnection(
    isRoomHost: boolean,
    identity: string,
    roomId?: string
  ) {
    try {
      store.dispatch(setShowOverlay(true));

      const stream = await navigator.mediaDevices.getUserMedia(
        this._defaultConstraints
      );

      console.log('Successfully received local stream');

      this._localStream = stream;

      this._showLocalVideoPreview(stream);

      if (isRoomHost) {
        wss.createNewRoom(identity);
      } else if (roomId) {
        wss.joinRoom(identity, roomId);
      }
    } catch (error) {
      console.log(
        'Error occurred when trying to get an access to local stream',
        error
      );
    } finally {
      store.dispatch(setShowOverlay(false));
    }
  }

  prepareNewPeerConnection(connUserSocketId: string, isInitiator: boolean) {
    const peer = new SimplePeer({
      initiator: isInitiator,
      config: {
        iceServers: [
          {
            urls: 'stun:stun.l.google.com:19302',
          },
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
      this._streams.push(stream);
    });
  }

  handleSignalingData(signal: SignalData, connUserSocketId: string) {
    // Add signaling data to peer connection
    this._peers.get(connUserSocketId)?.signal(signal);
  }

  removePeerConnection(disconnUserSocketId: string) {
    const videoContainer = document.getElementById(disconnUserSocketId);
    const videoElement = document.getElementById(
      `${disconnUserSocketId}_video`
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
    videosContainer.appendChild(videoContainer);
  }

  toggleMic(state: boolean) {
    this._localStream.getAudioTracks().forEach((x) => (x.enabled = state));
  }

  toggleVideo(state: boolean) {
    this._localStream.getVideoTracks().forEach((x) => (x.enabled = state));
  }
}

export const rtc = new WebRtcManager();
