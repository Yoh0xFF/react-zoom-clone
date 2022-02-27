import { User } from './user';

export interface ServerToClientEvent {
  newRoomCreated: (data: { roomId: string }) => void;
  roomUpdated: (data: { connectedUsers: Array<User> }) => void;
}

export interface ClientToServerEvent {
  createNewRoom: (data: { identity: string }) => void;
  joinRoom: (data: { identity: string; roomId: string }) => void;
}