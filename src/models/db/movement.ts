import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'

import { type } from './type'

export const movement = sqliteTable('MOVEMENT', {
  id: integer('id').primaryKey(),
  name: text('name').notNull().unique(),
  typeId: integer('type_id')
    .notNull()
    .references(() => type.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
})

export type movement = typeof movement.$inferSelect
