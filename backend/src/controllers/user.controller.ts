import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import { clerkClient } from '@clerk/express';
import { asyncHandler } from '../utils/asyncHandler';

export const getOrCreateUser = asyncHandler( async (req, res) => {
  const clerkId = req.auth?.userId;
  if (!clerkId) return res.status(401).json({ message: 'Unauthorized' });

  const existing = await db.select().from(users).where(eq(users.clerkId, clerkId)).limit(1);
  if (existing.length > 0) return res.status(200).json(existing[0]);

  const clerkUser = await clerkClient.users.getUser(clerkId);
  const newUser = await db
    .insert(users)
    .values({
      clerkId,
      email: clerkUser.emailAddresses[0]?.emailAddress ?? '',
      firstName: clerkUser.firstName ?? '',
      lastName: clerkUser.lastName ?? '',
      refreshToken: '',
    })
    .returning();

  res.status(201).json(newUser[0]);
});