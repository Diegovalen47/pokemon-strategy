import { eq, and, count } from 'drizzle-orm'
import type { SqliteRemoteDatabase } from 'drizzle-orm/sqlite-proxy'

import type { TypeLocal, TypeLocalRepository } from '../../domain'
import type { InsertDamageRelationDto } from '../../domain/dtos'

import {
  damageRelation,
  originType,
  type,
  type Relation
} from '@/modules/shared/infrastructure/models/db'

export class TypeOrmRepository implements TypeLocalRepository {
  constructor(public orm: SqliteRemoteDatabase) {}

  async insertTypes(typeData: TypeLocal | TypeLocal[]): Promise<void> {
    try {
      if (Array.isArray(typeData)) {
        await this.orm.insert(type).values(typeData)
        console.log('Lista Type insertado')
        return
      }
      await this.orm.insert(type).values(typeData)
      console.log('Type insertado')
    } catch (error) {
      console.error('Error al insertar type', error)
    }
  }

  async getTypesCount(): Promise<number> {
    try {
      return (await this.orm.select({ value: count() }).from(type))[0].value
    } catch (error) {
      console.error('Error al obtener todos los typos', error)
      throw new Error('Error al contar los pokemon')
    }
  }

  async getTypeById(id: number): Promise<TypeLocal> {
    try {
      const foundType = await this.orm.select().from(type).where(eq(type.id, id))
      return foundType[0]
    } catch (error) {
      console.error('Error al obtener type por id', error)
      throw new Error('Error al obtener type por id')
    }
  }

  async getAllTypes(): Promise<TypeLocal[]> {
    try {
      const types = await this.orm.select().from(type)
      return types
    } catch (error) {
      console.error('Error al obtener types', error)
      return []
    }
  }

  async getDamageRelationsCount(): Promise<number> {
    try {
      return (await this.orm.select({ value: count() }).from(damageRelation))[0].value
    } catch (error) {
      console.error('Error al obtener todas las relaciones de daño', error)
      throw new Error('Error al contar las relaciones de daño')
    }
  }

  async insertDamageRelation(
    damageRelationData: InsertDamageRelationDto | InsertDamageRelationDto[]
  ): Promise<void> {
    try {
      if (Array.isArray(damageRelationData)) {
        await this.orm.insert(damageRelation).values(damageRelationData)
        console.log('DamageRelation insertado')
        return
      }
      await this.orm.insert(damageRelation).values(damageRelationData)
      console.log('DamageRelation insertado')
    } catch (error) {
      console.error('Error al insertar DamageRelation', error)
    }
  }

  async getTypesForPokemon(pokemonId: number): Promise<TypeLocal[]> {
    try {
      const types = await this.orm
        .select()
        .from(type)
        .innerJoin(originType, eq(originType.typeId, type.id))
        .where(eq(originType.pokemonId, pokemonId))
      return types.map((type) => type.TYPE)
    } catch (error) {
      console.error('Error al obtener tipos para el pokemon', error)
      return []
    }
  }

  /**
   * @summary Obtiene los tipos que son afectados por el tipo especificado, con la relacion de daño especificada.
   * Ej: 'double_damage', 3 (que es flying)
   * Devuelve: [{name: 'fighting', id: 2}, {name: 'bug', id: 7}, {name: 'grass', id: 12}]
   * Significa que el tipo Volador infligie el doble de daño a los tipos pelea, bicho y plnta
   */
  async getDamageRelationsForType({
    relation,
    typeId
  }: {
    relation: Relation
    typeId: number
  }): Promise<TypeLocal[]> {
    try {
      const types = await this.orm
        .select()
        .from(damageRelation)
        .where(and(eq(damageRelation.relation, relation), eq(damageRelation.originTypeId, typeId)))
        .innerJoin(type, eq(damageRelation.destinyTypeId, type.id))
        .all()
      return types.map((type) => type.TYPE)
    } catch (error) {
      console.error('Error al obtener tipos con relation', error)
      return []
    }
  }
  /**
   * @summary Obtiene los tipos que afectan a al tipo especificado, con la relacion de daño especificada.
   * Ej: 'double_damage', 3 (que es flying)
   * Devuelve: [{name: 'electric', id: 13}, {name: 'rock', id: 6}, {name: 'ice', id: 15}]
   * Significa que el tipo Volador recibe el doble de daño de los tipos electrico, roca y hielo
   */
  async getDamageRelationsAgainstType({
    relation,
    typeId
  }: {
    relation: Relation
    typeId: number
  }): Promise<TypeLocal[]> {
    try {
      const types = await this.orm
        .select()
        .from(damageRelation)
        .where(and(eq(damageRelation.relation, relation), eq(damageRelation.destinyTypeId, typeId)))
        .innerJoin(type, eq(damageRelation.originTypeId, type.id))
        .all()
      return types.map((type) => type.TYPE)
    } catch (error) {
      console.error('Error al obtener tipos con relation', error)
      return []
    }
  }
}
