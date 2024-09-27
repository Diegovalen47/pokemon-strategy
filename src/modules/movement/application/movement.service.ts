import type { MovementLocalRepository, MovementRemoteRepository } from '../domain'

export class MovementService {
  constructor(
    private movementRemoteRepository: MovementRemoteRepository,
    private movementLocalRepository: MovementLocalRepository
  ) {}

  async getAllMovementsAndSaveInDb(): Promise<void> {
    let { next, movements } = await this.movementRemoteRepository.getMovementsFirstList()

    while (next) {
      await this.movementLocalRepository.insertMovements(movements)
      const response = await this.movementRemoteRepository.getMovementsNextList(next)
      next = response.next
      movements = response.movements
    }

    await this.movementLocalRepository.insertMovements(movements)
  }

  async getMovementsLocalCount(): Promise<number> {
    return this.movementLocalRepository.getMovementsCount()
  }

  async setMovementsExtraData(): Promise<void> {
    try {
      const movements = await this.movementLocalRepository.getAllMovements()
      const batchSize = 200

      for (let i = 0; i < movements.length; i += batchSize) {
        const batch = movements.slice(i, i + batchSize)
        const movementDetails = await Promise.all(
          batch.map((movement) => this.movementRemoteRepository.getMovementByNameOrId(movement.id))
        )
        await Promise.all(
          movementDetails.map((movementDetail) =>
            this.movementLocalRepository.updateMovement(movementDetail)
          )
        )
      }
    } catch (error) {
      console.error('Error al actualizar data extra de habilidades', error)
    }
  }
}
