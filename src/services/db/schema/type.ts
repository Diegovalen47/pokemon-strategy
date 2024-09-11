import {
  sqliteTable,
  integer,
  text,
  uniqueIndex
} from 'drizzle-orm/sqlite-core'

export const type = sqliteTable(
  'TYPE',
  {
    id: integer('id').primaryKey(),
    name: text('name').unique().notNull()
  },
  (table) => {
    return {
      nameIdx: uniqueIndex('name_idx').on(table.name)
    }
  }
)

export type type = typeof type.$inferSelect
