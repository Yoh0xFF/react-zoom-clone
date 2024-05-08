import { User } from './user';

export interface Room {
  id: string;
  connectedUsers: Array<User>;
}
