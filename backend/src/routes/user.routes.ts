// routes/user.routes.ts
import { Router } from 'express';
import { clerkAuthMiddleware } from '../middlewares/clerkAuthMiddleware';
import { getOrCreateUser } from '../controllers/user.controller';

const router = Router();

router.post('/me', clerkAuthMiddleware, getOrCreateUser);

export default router;
