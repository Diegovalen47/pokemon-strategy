import {
  sqliteTable,
  integer,
  text,
  uniqueIndex
} from 'drizzle-orm/sqlite-core'

export const pokemon = sqliteTable(
  'POKEMON',
  {
    id: integer('id').primaryKey(),
    name: text('name').notNull().unique(),
    sprite: text('sprite')
  },
  (table) => {
    return {
      nameIdx: uniqueIndex('name_idx').on(table.name)
    }
  }
)

export type Pokemon = typeof pokemon.$inferSelect
