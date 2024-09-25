import { count, eq } from 'drizzle-orm'
import type { SqliteRemoteDatabase } from 'drizzle-orm/sqlite-proxy'

import type { Movement, MovementLocalRepository } from '../../domain'

import { movement } from '@/modules/shared/infrastructure/models/db'

export class MovementOrmRepository implements MovementLocalRepository {
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

  async getMovementsCount(): Promise<number> {
    try {
      return (await this.orm.select({ value: count() }).from(movement))[0].value
    } catch (error) {
      console.error('Error al obtener todos los movimientos', error)
      throw new Error('Error al contar los movimientos')
    }
  }

  async updateMovement(movementData: Movement): Promise<void> {
    try {
      await this.orm.update(movement).set(movementData).where(eq(movement.id, movementData.id))
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
