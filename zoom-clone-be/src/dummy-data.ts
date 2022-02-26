import { User } from './models/user';
import { Room } from './models/room';

export const connectedUsers: Array<User> = [];
export const rooms: Array<Room> = [{ id: '12345', connectedUsers: [] }];
