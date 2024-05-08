import { Router } from 'express';

import { getTurnCredentials, roomExists } from '../controllers/room-controller';

const router = Router();

router.get('/room-exists/:roomId', roomExists);

router.get('/get-turn-credentials', getTurnCredentials);

export default router;
