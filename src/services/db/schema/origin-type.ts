import { sqliteTable, primaryKey, integer } from 'drizzle-orm/sqlite-core'
import { type } from './type'
import { pokemon } from './pokemon'

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

export type originType = typeof originType.$inferSelect
