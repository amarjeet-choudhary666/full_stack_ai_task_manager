import { User } from '../db/schema';

declare global {
  namespace Express {
    interface Request {
      auth?: {
        userId?: string;
      };
      user?: User;
    }
  }
}