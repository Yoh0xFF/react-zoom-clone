import { NextFunction, Request, Response } from 'express';
import { rooms } from '../dummy-data';

export function roomExists(req: Request, res: Response, next: NextFunction) {
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
