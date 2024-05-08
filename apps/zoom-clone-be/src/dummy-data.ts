import { Room } from './models/room';
import { User } from './models/user';

export const connectedUsers: Array<User> = [];
export const rooms: Array<Room> = [{ id: '12345', connectedUsers: [] }];
