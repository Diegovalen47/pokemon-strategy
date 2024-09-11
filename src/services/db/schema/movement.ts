import {
  sqliteTable,
  integer,
  text,
  uniqueIndex
} from 'drizzle-orm/sqlite-core'
import { type } from './type'

export const movement = sqliteTable(
  'MOVEMENT',
  {
    id: integer('id').primaryKey(),
    name: text('name').notNull().unique(),
    typeId: integer('type_id')
      .notNull()
      .references(() => type.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
  },
  (table) => {
    return {
      nameIdx: uniqueIndex('name_idx').on(table.name)
    }
  }
)

export type movement = typeof movement.$inferSelect
