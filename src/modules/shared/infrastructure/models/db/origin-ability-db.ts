import { sqliteTable, primaryKey, integer } from 'drizzle-orm/sqlite-core'

import { ability } from './ability-db'
import { pokemon } from './pokemon-db'

export const originAbility = sqliteTable(
  'ORIGIN_ABILITY',
  {
    slot: integer('slot').notNull(),
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
      pk: primaryKey({ columns: [table.pokemonId, table.abilityId, table.slot] })
    }
  }
)

export type OriginAbilityDB = typeof originAbility.$inferSelect
