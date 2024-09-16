import { sqliteTable, int, text } from 'drizzle-orm/sqlite-core'

export const pokemon = sqliteTable('POKEMON', {
  id: int('id').primaryKey({ autoIncrement: false }),
  name: text('name').notNull().unique(),
  sprite: text('sprite')
})

export type PokemonDB = typeof pokemon.$inferSelect
