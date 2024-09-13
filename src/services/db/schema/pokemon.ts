import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'

export const pokemon = sqliteTable('POKEMON', {
  id: integer('id').primaryKey(),
  name: text('name').notNull().unique(),
  sprite: text('sprite')
})

export type Pokemon = typeof pokemon.$inferSelect
