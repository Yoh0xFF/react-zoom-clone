import { SignalData } from 'simple-peer';
import { User } from './user';

export interface ServerToClientEvent {
  newRoomCreated: (data: { roomId: string }) => void;
  roomUpdated: (data: { connectedUsers: Array<User> }) => void;
  userDisconnected: (data: { disconnUserSocktId: string }) => void;
  connPrepare: (data: { connUserSocketId: string }) => void;
  connInit: (data: { connUserSocketId: string }) => void;
  connSignal: (data: { signal: SignalData; connUserSocketId: string }) => void;
}

export interface ClientToServerEvent {
  createNewRoom: (data: { identity: string }) => void;
  joinRoom: (data: { identity: string; roomId: string }) => void;
  connInit: (data: { connUserSocketId: string }) => void;
  connSignal: (data: { signal: SignalData; connUserSocketId: string }) => void;
}
