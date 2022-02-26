import { wss } from '@app/api/wss';
import { setShowOverlay } from '@app/store/slices/connection-slice';
import { store } from '@app/store/store';

const defaultConstraints: MediaStreamConstraints = {
  audio: true,
  video: true,
};

let localStream: MediaStream;

export async function getLocalPreviewAndInitRoomConnection(
  isRoomHost: boolean,
  identity: string,
  roomId?: string
) {
  try {
    store.dispatch(setShowOverlay(true));

    const stream = await navigator.mediaDevices.getUserMedia(
      defaultConstraints
    );

    console.log('Successfully received local stream');

    localStream = stream;

    showLocalVideoPreview(stream);

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

function showLocalVideoPreview(stream: MediaStream) {
  // Show local video preview
}
