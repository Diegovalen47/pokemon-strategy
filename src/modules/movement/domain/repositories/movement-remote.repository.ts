import type { Movement } from '../entities'

export interface MovementRemoteRepository {
  getMovementsFirstList(): Promise<{ next: string; movements: Movement[] }>
  getMovementsNextList(
    url: string
  ): Promise<{ next: string; movements: Movement[] }>
  getMovementByNameOrId(nameOrId: string | number): Promise<Movement>
}
