import type { Ability } from '../entities'

export interface AbilityRemoteRepository {
  getAbilitiesFirstList(): Promise<{ next: string; abilities: Ability[] }>
  getAbilitiesNextList(
    url: string
  ): Promise<{ next: string; abilities: Ability[] }>
  getAbilityByNameOrId(nameOrId: string | number): Promise<Ability>
}
