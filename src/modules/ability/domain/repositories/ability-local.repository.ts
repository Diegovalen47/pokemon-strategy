import type { Ability } from '../entities'

export interface AbilityLocalRepository {
  insertAbilities(abilitiesData: Ability | Ability[]): Promise<void>
  updateAbility(abilityData: Ability): Promise<void>
  getAllAbilities(): Promise<Ability[]>
}
