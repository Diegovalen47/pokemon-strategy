import type { Movement } from '../entities'

export interface MovementLocalRepository {
  insertMovements(movementsData: Movement | Movement[]): Promise<void>
  getMovementsCount(): Promise<number>
  updateMovement(movementData: Movement): Promise<void>
  getAllMovements(): Promise<Movement[]>
}
