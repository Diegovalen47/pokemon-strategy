import { sqliteTable, primaryKey, integer } from 'drizzle-orm/sqlite-core'

import { pokemon } from './pokemon'
import { type } from './type'

export const originType = sqliteTable(
  'ORIGIN_TYPE',
  {
    pokemonId: integer('pokemon_id')
      .notNull()
      .references(() => pokemon.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }),
    typeId: integer('type_id')
      .notNull()
      .references(() => type.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.pokemonId, table.typeId] })
    }
  }
)

export type OriginTypeDB = typeof originType.$inferSelect
