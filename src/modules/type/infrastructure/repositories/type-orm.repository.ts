import { eq, and, count } from 'drizzle-orm'
import type { SqliteRemoteDatabase } from 'drizzle-orm/sqlite-proxy'

import type { TypeLocal, TypeLocalRepository } from '../../domain'
import type { InsertDamageRelationDto } from '../../domain/dtos'

import { damageRelation, type, type Relation } from '@/modules/shared/infrastructure/models/db'

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

  async getDamageRelationsForType({
    relation,
    typeId
  }: {
    relation: Relation
    typeId: number
  }): Promise<any[]> {
    try {
      const types = await this.orm
        .select()
        .from(damageRelation)
        .where(and(eq(damageRelation.relation, relation), eq(damageRelation.originTypeId, typeId)))
        .leftJoin(type, eq(damageRelation.destinyTypeId, type.id))
        .all()
      return types
    } catch (error) {
      console.error('Error al obtener tipos con relation', error)
      return []
    }
  }
}
