import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import errorHandler from 'errorhandler';
import http from 'http';

import { Server } from 'socket.io';

import app from './app';
import { ClientToServerEvent, ServerToClientEvent } from './models/wss';
import { createNewRoomHandler, joinRoomHandler } from './handlers/room-handler';

// Configure environment
const appEnvLabel = process.env.APP_ENV || 'development';
const appEnv = dotenv.config({ path: `.env.${appEnvLabel}` });
dotenvExpand.expand(appEnv);

// Do not reject self signed certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Get port from environment and store in Express.
const port = process.env.PORT || '8080';
app.set('port', parseInt(port, 10));

// Error Handler. Provides full stack - remove for production
app.use(errorHandler());

// Create and run the server
const server = http.createServer(app);

// Create web socket server
const io = new Server<ClientToServerEvent, ServerToClientEvent>(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on('createNewRoom', (data) => {
    createNewRoomHandler(socket, data);
  });

  socket.on('joinRoom', (data) => {
    joinRoomHandler(io, socket, data);
  });
});

// Start express server.
server.listen(port);

server.on('error', (error) => {
  console.log('Http server failed', error);
});

server.on('listening', () => {
  console.log(
    'App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  );

  console.log('Press CTRL-C to stop\n');
});
