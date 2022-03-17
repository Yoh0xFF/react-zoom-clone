import { SignalData } from 'simple-peer';
import { Server, Socket } from 'socket.io';
import { DirectMessageType } from '../models/message';
import { v4 as uuid } from 'uuid';
import { connectedUsers, rooms } from '../dummy-data';
import { Room } from '../models/room';
import { User } from '../models/user';
import { ClientToServerEvent, ServerToClientEvent } from '../models/wss';

export function createNewRoomHandler(
  socket: Socket<ClientToServerEvent, ServerToClientEvent>,
  data: { identity: string; onlyAudio: boolean }
) {
  const { identity, onlyAudio } = data;
  const roomId = uuid();

  // Create new user
  const newUser: User = {
    id: uuid(),
    socketId: socket.id,
    identity,
    roomId,
    onlyAudio,
  };
  connectedUsers.push(newUser);

  // Create new room
  const newRoom: Room = {
    id: roomId,
    connectedUsers: [newUser],
  };
  rooms.push(newRoom);

  socket.join(roomId);

  // emit room id to the creator
  socket.emit('newRoomCreated', { roomId });

  // emit new user join event to the connected users in the room
  socket.emit('roomUpdated', { connectedUsers: newRoom.connectedUsers });
}

export function joinRoomHandler(
  server: Server<ClientToServerEvent, ServerToClientEvent>,
  socket: Socket<ClientToServerEvent, ServerToClientEvent>,
  data: { identity: string; onlyAudio: boolean; roomId: string }
) {
  const { identity, onlyAudio, roomId } = data;

  // Create new user
  const newUser: User = {
    id: uuid(),
    socketId: socket.id,
    identity,
    roomId,
    onlyAudio,
  };

  // Find and join the room
  const room = rooms.find((x) => x.id === roomId);
  if (!room) {
    return;
  }
  room.connectedUsers.push(newUser);
  connectedUsers.push(newUser);

  socket.join(roomId);

  // Emit to the all users in the room to prepare peer connection
  room.connectedUsers.forEach((x) => {
    if (x.socketId === socket.id) {
      return;
    }

    server.to(x.socketId).emit('connPrepare', { connUserSocketId: socket.id });
  });

  // emit new user join event to the connected users in the room
  server
    .to(roomId)
    .emit('roomUpdated', { connectedUsers: room.connectedUsers });
}

export function initConnectionHandler(
  server: Server<ClientToServerEvent, ServerToClientEvent>,
  socket: Socket<ClientToServerEvent, ServerToClientEvent>,
  data: { connUserSocketId: string }
) {
  const { connUserSocketId } = data;

  // Information from clients which are in room and prepared for incoming connection
  server.to(connUserSocketId).emit('connInit', { connUserSocketId: socket.id });
}

export function signalingHandler(
  server: Server<ClientToServerEvent, ServerToClientEvent>,
  socket: Socket<ClientToServerEvent, ServerToClientEvent>,
  data: { signal: SignalData; connUserSocketId: string }
) {
  const { signal, connUserSocketId } = data;

  server
    .to(connUserSocketId)
    .emit('connSignal', { signal: signal, connUserSocketId: socket.id });
}

export function directMessageHandler(
  server: Server<ClientToServerEvent, ServerToClientEvent>,
  socket: Socket<ClientToServerEvent, ServerToClientEvent>,
  data: DirectMessageType
) {
  const { receiverSocketId, identity, content } = data;

  const receiver = connectedUsers.find((x) => x.socketId === receiverSocketId);
  if (!receiver) {
    return;
  }

  const receiverData: DirectMessageType = {
    authorSocketId: socket.id,
    content,
    messageCreatedByMe: false,
    identity,
  };
  server.to(data.receiverSocketId).emit('directMessage', receiverData);

  const authorData: DirectMessageType = {
    receiverSocketId: data.receiverSocketId,
    content,
    messageCreatedByMe: true,
    identity,
  };
  socket.emit('directMessage', authorData);
}

export function disconnectHandler(
  server: Server<ClientToServerEvent, ServerToClientEvent>,
  socket: Socket<ClientToServerEvent, ServerToClientEvent>
) {
  // Find if the user is connected
  const user = connectedUsers.find((x) => x.socketId === socket.id);

  if (user) {
    // Remove user from room in server
    const room = rooms.find((x) => x.id == user.roomId);
    room.connectedUsers = room.connectedUsers.filter((x) => x.id !== user.id);

    socket.leave(room.id);
    connectedUsers.splice(connectedUsers.indexOf(user), 1);

    if (room.connectedUsers.length > 0) {
      // emit user disconnected event to the connected users in the room
      server
        .to(room.id)
        .emit('userDisconnected', { disconnUserSocktId: socket.id });

      // emit room updated event to the connected users in the room
      server
        .to(room.id)
        .emit('roomUpdated', { connectedUsers: room.connectedUsers });
    } else {
      rooms.splice(rooms.indexOf(room), 1);
    }
  }
}
