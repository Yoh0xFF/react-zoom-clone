import { Socket, io } from 'socket.io-client';

import { setRoomId } from '@app/store/slices/connection-slice';
import { store } from '@app/store/store';

interface ServerToClientEvent {
  newRoomCreated: (data: { roomId: string }) => void;
}

interface ClientToServerEvent {
  createNewRoom: (data: { identity: string }) => void;
  joinRoom: (data: { identity: string; roomId: string }) => void;
}

class WebSocket {
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
  }

  createNewRoom(identity: string) {
    this._socket.emit('createNewRoom', { identity });
  }

  joinRoom(identity: string, roomId: string) {
    this._socket.emit('joinRoom', { identity, roomId });
  }
}

export const wss = new WebSocket();
