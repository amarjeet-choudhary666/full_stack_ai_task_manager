"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveUserIfNotExists = void 0;
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const express_1 = require("@clerk/express");
const saveUserIfNotExists = async (req, res, next) => {
    const clerkId = req.auth?.userId;
    if (!clerkId) {
        res.status(401).json({ message: 'Unauthorized: Clerk ID missing' });
        return;
    }
    try {
        const existing = await db_1.db
            .select()
            .from(schema_1.users)
            .where((0, drizzle_orm_1.eq)(schema_1.users.clerkId, clerkId))
            .limit(1);
        if (existing.length > 0) {
            req.user = existing[0];
            return next();
        }
        const clerkUser = await express_1.clerkClient.users.getUser(clerkId);
        const inserted = await db_1.db
            .insert(schema_1.users)
            .values({
            clerkId,
            firstName: clerkUser.firstName ?? '',
            lastName: clerkUser.lastName ?? '',
            email: clerkUser.emailAddresses[0].emailAddress,
            refreshToken: '',
        })
            .returning();
        req.user = inserted[0];
        return next();
    }
    catch (err) {
        console.error('saveUserIfNotExists error:', err);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
    }
};
exports.saveUserIfNotExists = saveUserIfNotExists;
