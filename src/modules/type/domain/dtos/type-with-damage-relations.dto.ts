import type { TypeLocal } from '../entities'

export type TypeWithDamageRelations = {
  id: number
  name: string
  damageRelations: DamageRelations
}

export type DamageRelations = {
  doubleDamageTo: TypeLocal[]
  halfDamageTo: TypeLocal[]
  noDamageTo: TypeLocal[]
}
