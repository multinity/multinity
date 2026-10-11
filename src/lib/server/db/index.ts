import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { DATABASE_URL } from '$app/env/private';

export const client = DATABASE_URL ? postgres(DATABASE_URL) : null;

export const db = client ? drizzle(client, { schema }) : null;
