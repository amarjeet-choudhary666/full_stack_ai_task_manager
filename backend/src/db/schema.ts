import {
  pgTable,
  text,
  timestamp,
  varchar,
  uuid,
  boolean,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';



export const users = pgTable('users', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`), // your internal ID
  clerkId: varchar('clerk_id', { length: 255 }).notNull().unique(), // Clerk user ID
  firstName: varchar('firstname', { length: 100 }),
  lastName: varchar('lastname', { length: 100 }),
  email: varchar('email', { length: 100 }).notNull().unique(),
  refreshToken: varchar('refresh_token', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
});


export const tasks = pgTable('tasks', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  title: text('title').notNull(),
  description: text('description'),
  completed: boolean('completed').default(false).notNull(),
  clerkId: text('clerk_id').notNull(), // Clerk userId is a string (not UUID)
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
