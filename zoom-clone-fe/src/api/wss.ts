import { Socket, io } from 'socket.io-client';

const serverUrl = 'http://localhost:8080';

let socket: Socket | undefined = undefined;

export function connectWithSocketIoServer() {
  socket = io(serverUrl);

  socket.on('connect', () => {
    console.log('Successfully connected to the socket io server');
    console.log(socket?.id);
  });
}
