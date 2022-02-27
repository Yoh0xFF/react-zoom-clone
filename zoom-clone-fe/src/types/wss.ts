import { User } from '@app/types/user';

export interface ServerToClientEvent {
  newRoomCreated: (data: { roomId: string }) => void;
  roomUpdated: (data: { connectedUsers: Array<User> }) => void;
  connPrepare: (data: { newUserSocketId: string }) => void;
}

export interface ClientToServerEvent {
  createNewRoom: (data: { identity: string }) => void;
  joinRoom: (data: { identity: string; roomId: string }) => void;
}
