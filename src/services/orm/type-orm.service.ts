import type { SqliteRemoteDatabase } from 'drizzle-orm/sqlite-proxy'

import type { Type } from '@/models/core'
import { type } from '@/models/db'

export class TypeOrmService {
  constructor(public orm: SqliteRemoteDatabase) {}

  async insertType(typeData: Type | Type[]): Promise<void> {
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
}
