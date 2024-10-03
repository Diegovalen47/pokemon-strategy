import type { Ability } from '@/modules/ability/domain'
import type { PokemonLocal } from '@/modules/pokemon/domain'
import type { TypeLocal } from '@/modules/type/domain'
import type { TypeWithDamageRelations } from '@/modules/type/domain/dtos'

export interface PokemonFullDetails extends PokemonLocal {
  abilities: Ability[]
  types: TypeWithDamageRelations[]
  damagesReceived: Map<number, TypeLocal[]>
}
