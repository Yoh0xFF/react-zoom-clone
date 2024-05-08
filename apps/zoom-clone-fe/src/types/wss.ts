import { User } from '@app/types/user';
import { SignalData } from 'simple-peer';

import { DirectMessageType } from './message';

export interface ServerToClientEvent {
  newRoomCreated: (data: { roomId: string }) => void;
  roomUpdated: (data: { connectedUsers: Array<User> }) => void;
  userDisconnected: (data: { disconnUserSocktId: string }) => void;
  connPrepare: (data: { connUserSocketId: string }) => void;
  connInit: (data: { connUserSocketId: string }) => void;
  connSignal: (data: { signal: SignalData; connUserSocketId: string }) => void;
  directMessage: (data: DirectMessageType) => void;
}

export interface ClientToServerEvent {
  createNewRoom: (data: { identity: string; onlyAudio: boolean }) => void;
  joinRoom: (data: {
    identity: string;
    onlyAudio: boolean;
    roomId: string;
  }) => void;
  connInit: (data: { connUserSocketId: string }) => void;
  connSignal: (data: { signal: SignalData; connUserSocketId: string }) => void;
  directMessage: (data: DirectMessageType) => void;
}
