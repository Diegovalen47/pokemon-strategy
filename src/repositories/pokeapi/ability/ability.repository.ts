import type { Ability } from '@/models/core'

export interface AbilityRepository {
  getAbilitiesFirstList(): Promise<{ next: string; abilities: Ability[] }>
  getAbilitiesNextList(
    url: string
  ): Promise<{ next: string; abilities: Ability[] }>
  getAbilityByNameOrId(nameOrId: string | number): Promise<Ability>
}
