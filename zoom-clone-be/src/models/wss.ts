export interface ServerToClientEvent {
  newRoomCreated: (data: { roomId: string }) => void;
}

export interface ClientToServerEvent {
  createNewRoom: (data: { identity: string }) => void;
  joinRoom: (data: { identity: string; roomId: string }) => void;
}
