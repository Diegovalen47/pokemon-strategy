import type { Movement } from '@/models/core'

export interface MovementRepository {
  getMovementsFirstList(): Promise<{ next: string; movements: Movement[] }>
  getMovementsNextList(
    url: string
  ): Promise<{ next: string; movements: Movement[] }>
  getMovementByNameOrId(nameOrId: string | number): Promise<Movement>
}
