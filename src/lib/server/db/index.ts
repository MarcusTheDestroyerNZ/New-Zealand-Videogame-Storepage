import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = createClient({ url: env.DATABASE_URL });

export const db = drizzle(client, { schema });

const bootstrapDatabase = async () => {
	// Keep the app readable on a fresh database by creating the game tables up front.
	await client.execute(`
		CREATE TABLE IF NOT EXISTS games (
			id TEXT PRIMARY KEY NOT NULL,
			title TEXT NOT NULL,
			description TEXT NOT NULL DEFAULT '',
			price TEXT NOT NULL DEFAULT '0.00',
			url TEXT NOT NULL DEFAULT ''
		)
	`);

	await client.execute(`
		CREATE TABLE IF NOT EXISTS game_ownership (
			game_id TEXT NOT NULL,
			user_id TEXT NOT NULL
		)
	`);
};

export const dbReady = bootstrapDatabase();
