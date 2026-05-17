import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { user } from './auth.schema';

export const game = sqliteTable('games', {
	id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
	title: text('title').notNull(),
	description: text('description').notNull().default(''),
	url: text('url').notNull().default('')
});

export const GameOwnership = sqliteTable('game_ownership', {
	gameId: text('game_id').notNull().references(() => game.id),
	userId: text('user_id').notNull().references(() => user.id)
});

export *  from './auth.schema';
