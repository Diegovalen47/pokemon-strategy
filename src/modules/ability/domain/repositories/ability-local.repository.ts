import type { Ability } from '../entities'

export interface AbilityLocalRepository {
  insertAbilities(abilitiesData: Ability | Ability[]): Promise<void>
  getAbilitiesCount(): Promise<number>
  updateAbility(abilityData: Ability): Promise<void>
  getAllAbilities(): Promise<Ability[]>
  getAbilitiesForPokemon(pokemonId: number): Promise<Ability[]>
}
