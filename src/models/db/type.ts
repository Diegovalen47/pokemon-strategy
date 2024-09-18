import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'

export const type = sqliteTable('TYPE', {
  id: integer('id').primaryKey({ autoIncrement: false }),
  name: text('name').unique().notNull()
})

export type TypeDB = typeof type.$inferSelect
