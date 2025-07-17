"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
exports.getPgVersion = getPgVersion;
const dotenv_1 = __importDefault(require("dotenv"));
const serverless_1 = require("@neondatabase/serverless");
const neon_http_1 = require("drizzle-orm/neon-http");
dotenv_1.default.config();
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is not set');
}
const sql = (0, serverless_1.neon)(databaseUrl);
const db = (0, neon_http_1.drizzle)(sql);
exports.db = db;
async function getPgVersion() {
    const result = await sql `SELECT version()`;
    console.log(result[0]);
}
