import SimplePeer, { SignalData } from 'simple-peer';

import { wss } from '@app/api/wss';
import { setShowOverlay } from '@app/store/slices/connection-slice';
import { store } from '@app/store/store';

class WebRtcManager {
  private _defaultConstraints: MediaStreamConstraints = {
    audio: true,
    video: true,
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

  private _showLocalVideoPreview(stream: MediaStream) {
    // Show local video preview
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

  private _addStream(stream: MediaStream, connUserSocketId: string) {
    // Display incoming stream
  }
}

export const rtc = new WebRtcManager();
