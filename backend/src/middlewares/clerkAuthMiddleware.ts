import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import { asyncHandler } from '../utils/asyncHandler';

const client = jwksClient({
  jwksUri: process.env.CLERK_JWKS_URL!,
});

function getKey(header: any, callback: any) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err || !key) return callback(err || new Error('Key not found'));
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

export const clerkAuthMiddleware =asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Unauthorized: No token' });

  jwt.verify(token, getKey, {}, (err, decoded: any) => {
    if (err) {
      console.error('JWT verify error:', err);
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.auth = { userId: decoded.sub };
    next();
  });
})
