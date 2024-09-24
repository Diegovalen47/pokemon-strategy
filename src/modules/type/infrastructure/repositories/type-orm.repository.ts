import { eq, and } from 'drizzle-orm'
import type { SqliteRemoteDatabase } from 'drizzle-orm/sqlite-proxy'

import type { TypeLocal, TypeLocalRepository } from '../../domain'

import {
  damageRelation,
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

  async getAllTypes(): Promise<TypeLocal[]> {
    try {
      const types = await this.orm.select().from(type)
      return types
    } catch (error) {
      console.error('Error al obtener types', error)
      return []
    }
  }

  async insertDamageRelation(
    originTypeId: number,
    destinyTypeId: number,
    relation: Relation
  ): Promise<void> {
    try {
      await this.orm
        .insert(damageRelation)
        .values({ originTypeId, destinyTypeId, relation })
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
        .where(
          and(
            eq(damageRelation.relation, relation),
            eq(damageRelation.originTypeId, typeId)
          )
        )
        .leftJoin(type, eq(damageRelation.destinyTypeId, type.id))
        .all()
      return types
    } catch (error) {
      console.error('Error al obtener tipos con relation', error)
      return []
    }
  }
}
