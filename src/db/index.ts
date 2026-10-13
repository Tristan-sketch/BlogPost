
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const databaseURL = process.env.DATABASE_URL!;

const client = postgres(databaseURL);
export const db = drizzle(client);
