import { sqliteTable, primaryKey, integer } from 'drizzle-orm/sqlite-core'
import { pokemon } from './pokemon'
import { ability } from './ability'

export const originAbility = sqliteTable(
  'ORIGIN_TYPE',
  {
    pokemonId: integer('pokemon_id')
      .notNull()
      .references(() => pokemon.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }),
    abilityId: integer('ability_id')
      .notNull()
      .references(() => ability.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.pokemonId, table.abilityId] })
    }
  }
)

export type originAbility = typeof originAbility.$inferSelect
