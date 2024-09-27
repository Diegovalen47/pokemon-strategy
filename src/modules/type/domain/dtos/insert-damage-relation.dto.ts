import type { Relation } from '../entities'

export type InsertDamageRelationDto = {
  originTypeId: number
  destinyTypeId: number
  relation: Relation
}
