"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasks = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.uuid)('id').primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`), // your internal ID
    clerkId: (0, pg_core_1.varchar)('clerk_id', { length: 255 }).notNull().unique(), // Clerk user ID
    firstName: (0, pg_core_1.varchar)('firstname', { length: 100 }),
    lastName: (0, pg_core_1.varchar)('lastname', { length: 100 }),
    email: (0, pg_core_1.varchar)('email', { length: 100 }).notNull().unique(),
    refreshToken: (0, pg_core_1.varchar)('refresh_token', { length: 255 }),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
exports.tasks = (0, pg_core_1.pgTable)('tasks', {
    id: (0, pg_core_1.uuid)('id').primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    title: (0, pg_core_1.text)('title').notNull(),
    description: (0, pg_core_1.text)('description'),
    completed: (0, pg_core_1.boolean)('completed').default(false).notNull(),
    userId: (0, pg_core_1.uuid)('user_id').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});
