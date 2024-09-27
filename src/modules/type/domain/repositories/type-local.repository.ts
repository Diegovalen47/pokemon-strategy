import type { InsertDamageRelationDto } from '../dtos'
import type { Relation, TypeLocal } from '../entities'

export interface TypeLocalRepository {
  insertTypes(typeData: TypeLocal | TypeLocal[]): Promise<void>
  getAllTypes(): Promise<TypeLocal[]>
  getTypesCount(): Promise<number>
  getDamageRelationsCount(): Promise<number>
  insertDamageRelation(
    damageRelationData: InsertDamageRelationDto | InsertDamageRelationDto[]
  ): Promise<void>
  getDamageRelationsForType({
    relation,
    typeId
  }: {
    relation: Relation
    typeId: number
  }): Promise<any[]>
}
