import dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import type { NeonHttpDatabase } from 'drizzle-orm/neon-http';


dotenv.config();

const databaseUrl = process.env.DATABASE_URL as string;


if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is not set');
}

const sql = neon(databaseUrl);
const db: NeonHttpDatabase = drizzle(sql);

async function getPgVersion() {
    const result = await sql`SELECT version()`;
    console.log(result[0]);
}

export { db, getPgVersion}