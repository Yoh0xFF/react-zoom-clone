import { NextFunction, Router, Request, Response } from 'express';
import { Room } from '../models/room';
import { User } from '../models/user';

const router = Router();

let connectedUsers: Array<User> = [];
let rooms: Array<Room> = [{ id: '12345', connectedUsers: [] }];

router.get(
  '/room-exists/:roomId',
  (req: Request, res: Response, next: NextFunction) => {
    const { roomId } = req.params;
    const room = rooms.find((x) => x.id === roomId);

    if (room) {
      if (room.connectedUsers.length > 3) {
        res.send({ roomExists: true, full: true });
      } else {
        res.send({ roomExists: true, full: false });
      }
    } else {
      res.status(404).send({ roomExists: false });
    }
  }
);

export default router;
