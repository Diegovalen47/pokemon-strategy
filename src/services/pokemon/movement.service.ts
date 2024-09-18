import type { MovementOrmService } from '../orm'

import type { MovementRepository } from '@/repositories/pokeapi'

export class MovementService {
  constructor(
    private movementRepository: MovementRepository,
    private movementOrmService: MovementOrmService
  ) {}

  async getAllMovementsAndSaveInDb(): Promise<void> {
    let { next, movements } =
      await this.movementRepository.getMovementsFirstList()

    while (next) {
      await this.movementOrmService.insertMovements(movements)
      const response = await this.movementRepository.getMovementsNextList(next)
      next = response.next
      movements = response.movements
    }

    await this.movementOrmService.insertMovements(movements)
  }

  async setMovementsExtraData(): Promise<void> {
    try {
      const movements = await this.movementOrmService.getAllMovements()
      const batchSize = 100

      for (let i = 0; i < movements.length; i += batchSize) {
        const batch = movements.slice(i, i + batchSize)
        const movementDetails = await Promise.all(
          batch.map((movement) =>
            this.movementRepository.getMovementByNameOrId(movement.id)
          )
        )
        await Promise.all(
          movementDetails.map((movementDetail) =>
            this.movementOrmService.updateMovement(movementDetail)
          )
        )
      }
    } catch (error) {
      console.error('Error al actualizar data extra de habilidades', error)
    }
  }
}
