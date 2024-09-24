import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'

import { type } from './type-db'

export const movement = sqliteTable('MOVEMENT', {
  id: integer('id').primaryKey({ autoIncrement: false }),
  name: text('name').notNull().unique(),
  effect: text('effect'),
  damageClass: text('damage_class'),
  accuracy: integer('accuracy'),
  power: integer('power'),
  pp: integer('pp'),
  priority: integer('priority'),
  typeId: integer('type_id').references(() => type.id, {
    onDelete: 'set null',
    onUpdate: 'cascade'
  })
})

export type MovementDB = typeof movement.$inferSelect
