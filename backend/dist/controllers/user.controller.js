"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateUser = void 0;
const express_1 = require("@clerk/express");
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const asyncHandler_1 = require("../utils/asyncHandler");
exports.getOrCreateUser = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    try {
        const clerkId = req.auth?.userId;
        if (!clerkId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const existing = await db_1.db
            .select()
            .from(schema_1.users)
            .where((0, drizzle_orm_1.eq)(schema_1.users.clerkId, clerkId))
            .limit(1);
        if (existing.length > 0) {
            res.json(existing[0]);
            return;
        }
        const clerkUser = await express_1.clerkClient.users.getUser(clerkId);
        const firstName = clerkUser.firstName ?? clerkUser.username ?? 'Anonymous';
        const email = clerkUser.emailAddresses[0]?.emailAddress ?? '';
        const lastName = clerkUser.lastName ?? '';
        const inserted = await db_1.db
            .insert(schema_1.users)
            .values({
            clerkId,
            firstName,
            lastName,
            email,
            refreshToken: '',
        })
            .returning();
        res.status(201).json(inserted[0]);
    }
    catch (error) {
        console.error('User controller error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
