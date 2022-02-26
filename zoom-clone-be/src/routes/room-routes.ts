import { Router } from 'express';
import { roomExists } from '../controllers/room-controller';

const router = Router();

router.get('/room-exists/:roomId', roomExists);

export default router;
