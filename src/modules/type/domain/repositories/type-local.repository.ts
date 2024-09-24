import type { Relation, TypeLocal } from '../entities'

export interface TypeLocalRepository {
  insertTypes(typeData: TypeLocal | TypeLocal[]): Promise<void>
  getAllTypes(): Promise<TypeLocal[]>
  insertDamageRelation(
    originTypeId: number,
    destinyTypeId: number,
    relation: Relation
  ): Promise<void>
  getDamageRelationsForType({
    relation,
    typeId
  }: {
    relation: Relation
    typeId: number
  }): Promise<any[]>
}
