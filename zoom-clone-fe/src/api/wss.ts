import { Socket, io } from 'socket.io-client';

import { rtc } from '@app/api/web-rtc-handler';
import { setParticipants, setRoomId } from '@app/store/slices/connection-slice';
import { store } from '@app/store/store';
import { ClientToServerEvent, ServerToClientEvent } from '@app/types/wss';

class WebSocketManager {
  private _serverUrl = 'http://localhost:8080';
  private _socket!: Socket<ServerToClientEvent, ClientToServerEvent>;

  connect() {
    if (this._socket) {
      return;
    }

    this._socket = io(this._serverUrl);

    this._socket.on('connect', () => {
      console.log('Successfully connected to the socket io server');
      console.log(this._socket.id);
    });

    this._socket.on('newRoomCreated', (data) => {
      const { roomId } = data;
      store.dispatch(setRoomId(roomId));
    });

    this._socket.on('roomUpdated', (data) => {
      const { connectedUsers } = data;
      store.dispatch(setParticipants(connectedUsers));
    });

    this._socket.on('connPrepare', (data) => {
      const { newUserSocketId } = data;

      rtc.prepareNewPeerConnection(newUserSocketId, false);
    });
  }

  createNewRoom(identity: string) {
    this._socket.emit('createNewRoom', { identity });
  }

  joinRoom(identity: string, roomId: string) {
    this._socket.emit('joinRoom', { identity, roomId });
  }
}

export const wss = new WebSocketManager();
