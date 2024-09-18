import { eq } from 'drizzle-orm'
import type { SqliteRemoteDatabase } from 'drizzle-orm/sqlite-proxy'

import type { Movement } from '@/models/core'
import { movement } from '@/models/db'

export class MovementOrmService {
  constructor(public orm: SqliteRemoteDatabase) {}

  async insertMovements(movementsData: Movement | Movement[]): Promise<void> {
    try {
      if (Array.isArray(movementsData)) {
        await this.orm.insert(movement).values(movementsData)
        console.log('Lista Movements insertado')
        return
      }
      await this.orm.insert(movement).values(movementsData)
      console.log('Movement insertado')
    } catch (error) {
      console.error('Error al insertar movement', error)
    }
  }

  async updateMovement(movementData: Movement): Promise<void> {
    try {
      await this.orm
        .update(movement)
        .set(movementData)
        .where(eq(movement.id, movementData.id))
      console.log('Movement actualizado')
    } catch (error) {
      console.error('Error al actualizar movement', error)
    }
  }

  async getAllMovements(): Promise<Movement[]> {
    try {
      const movements = await this.orm.select().from(movement)
      return movements
    } catch (error) {
      console.error('Error al obtener movements', error)
      return []
    }
  }
}
