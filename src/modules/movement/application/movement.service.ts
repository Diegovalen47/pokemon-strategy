import type { MovementLocalRepository, MovementRemoteRepository } from '../domain'

export class MovementService {
  constructor(
    private movementRemoteRepository: MovementRemoteRepository,
    private movementLocalRepository: MovementLocalRepository
  ) {}

  async getAllMovementsAndSaveInDb(): Promise<void> {
    let { next, movements } = await this.movementRemoteRepository.getMovementsFirstList()

    while (next) {
      const movementDetails = await Promise.all(
        movements.map((movement) =>
          this.movementRemoteRepository.getMovementByNameOrId(movement.id)
        )
      )
      await this.movementLocalRepository.insertMovements(movementDetails)
      const response = await this.movementRemoteRepository.getMovementsNextList(next)
      next = response.next
      movements = response.movements
    }

    await this.movementLocalRepository.insertMovements(movements)
  }

  async getMovementsLocalCount(): Promise<number> {
    return this.movementLocalRepository.getMovementsCount()
  }
}
