import {
  sqliteTable,
  integer,
  text,
  uniqueIndex
} from 'drizzle-orm/sqlite-core'

export const type = sqliteTable('TYPE', {
  id: integer('id').primaryKey(),
  name: text('name').unique().notNull()
})

export type type = typeof type.$inferSelect
