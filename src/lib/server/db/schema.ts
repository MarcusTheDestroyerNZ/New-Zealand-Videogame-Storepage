import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const game = sqliteTable('games', {
	id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
	title: text('title').notNull(),
	description: text('description').notNull().default(''),
	url: text('url').notNull().default('')
});

export *  from './auth.schema';
