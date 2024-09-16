import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

import { type } from './type'

export type Relation =
  | 'double_damage'
  | 'half_damage'
  | 'no_damage'
  | 'normal_damage'

export const damageRelation = sqliteTable('DAMAGE_RELATION', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  relation: text('relation')
    .$type<Relation>()
    .default('normal_damage')
    .notNull(),
  originTypeId: integer('origin_type_id')
    .notNull()
    .references(() => type.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }),
  destinyTypeId: integer('destiny_type_id')
    .notNull()
    .references(() => type.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
})

export type DamageRelationDB = typeof damageRelation.$inferSelect
