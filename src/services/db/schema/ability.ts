import {
  sqliteTable,
  integer,
  text,
  uniqueIndex
} from 'drizzle-orm/sqlite-core'

export const ability = sqliteTable('ABILITY', {
  id: integer('id').primaryKey(),
  name: text('name').notNull().unique(),
  effect: text('effect')
})

export type ability = typeof ability.$inferSelect
