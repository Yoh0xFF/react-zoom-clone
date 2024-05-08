import { rtc } from '@app/api/webrtc';
import {
  appendDirectChatHisotry,
  setSocketId,
} from '@app/store/slices/chat-slice';
import { setParticipants, setRoomId } from '@app/store/slices/connection-slice';
import { store } from '@app/store/store';
import { DirectMessageType } from '@app/types/message';
import { ClientToServerEvent, ServerToClientEvent } from '@app/types/wss';
import { SignalData } from 'simple-peer';
import { Socket, io } from 'socket.io-client';

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
      store.dispatch(setSocketId(this._socket.id ?? ''));
    });

    this._socket.on('newRoomCreated', (data) => {
      const { roomId } = data;
      store.dispatch(setRoomId(roomId));
    });

    this._socket.on('roomUpdated', (data) => {
      const { connectedUsers } = data;
      store.dispatch(setParticipants(connectedUsers));
    });

    this._socket.on('userDisconnected', (data) => {
      const { disconnUserSocktId } = data;
      rtc.removePeerConnection(disconnUserSocktId);
    });

    this._socket.on('connPrepare', (data) => {
      const { connUserSocketId } = data;

      rtc.prepareNewPeerConnection(connUserSocketId, false);

      // Inform the user which just join the room, that we have prepared for incoming connection
      this._socket.emit('connInit', { connUserSocketId });
    });

    this._socket.on('connInit', (data) => {
      const { connUserSocketId } = data;

      rtc.prepareNewPeerConnection(connUserSocketId, true);
    });

    this._socket.on('connSignal', (data) => {
      const { signal, connUserSocketId } = data;

      rtc.handleSignalingData(signal, connUserSocketId);
    });

    this._socket.on('directMessage', (data) => {
      store.dispatch(appendDirectChatHisotry(data));
    });
  }

  createNewRoom(identity: string, onlyAudio: boolean) {
    this._socket.emit('createNewRoom', { identity, onlyAudio });
  }

  joinRoom(identity: string, onlyAudio: boolean, roomId: string) {
    this._socket.emit('joinRoom', { identity, onlyAudio, roomId });
  }

  signalPeerData(signal: SignalData, connUserSocketId: string) {
    this._socket.emit('connSignal', { signal, connUserSocketId });
  }

  sendDirectMessage(message: DirectMessageType) {
    this._socket.emit('directMessage', message);
  }
}

export const wss = new WebSocketManager();
