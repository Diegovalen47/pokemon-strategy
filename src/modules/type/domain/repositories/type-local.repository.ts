import type { InsertDamageRelationDto } from '../dtos'
import type { Relation, TypeLocal } from '../entities'

export interface TypeLocalRepository {
  insertTypes(typeData: TypeLocal | TypeLocal[]): Promise<void>
  getTypeById(id: number): Promise<TypeLocal>
  getAllTypes(): Promise<TypeLocal[]>
  getTypesCount(): Promise<number>
  getDamageRelationsCount(): Promise<number>
  insertDamageRelation(
    damageRelationData: InsertDamageRelationDto | InsertDamageRelationDto[]
  ): Promise<void>
  getTypesForPokemon(pokemonId: number): Promise<TypeLocal[]>
  getDamageRelationsForType({
    relation,
    typeId
  }: {
    relation: Relation
    typeId: number
  }): Promise<TypeLocal[]>
  getDamageRelationsAgainstType({
    relation,
    typeId
  }: {
    relation: Relation
    typeId: number
  }): Promise<TypeLocal[]>
}
