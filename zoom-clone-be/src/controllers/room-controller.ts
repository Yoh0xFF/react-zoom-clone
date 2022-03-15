import { NextFunction, Request, Response } from 'express';
import { rooms } from '../dummy-data';
import { Twilio } from 'twilio';

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

export async function getTurnCredentials(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accountSid = 'AC1234567'; // TODO
  const authToken = 'secret'; // TODO

  const client = new Twilio(accountSid, authToken);

  try {
    // TODO
    // const token: TokenInstance = await client.tokens.create();
    // res.send({ token });
    res.send({ token: null });
  } catch (err) {
    console.log('Failed to fetch turn server credentials', err);
    res.send({ token: null });
  }
}
