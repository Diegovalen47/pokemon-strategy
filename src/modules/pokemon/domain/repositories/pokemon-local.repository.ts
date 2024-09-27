import type { InsertOriginAbilityDto, InsertOriginTypeDto } from '../dtos'
import { type PokemonLocal } from '../entities/pokemon-local.entity'

export interface PokemonLocalRepository {
  getPokemonCount(): Promise<number>
  getAllPokemon(): Promise<PokemonLocal[]>
  updatePokemonSprite({ id, sprite }: { id: number; sprite: string }): Promise<void>
  searchPokemonByLikeName(query: string): Promise<PokemonLocal[] | Error>
  getOriginAbilitiesCount(): Promise<number>
  getOriginTypesCount(): Promise<number>
  insertPokemon(pokemonData: PokemonLocal | PokemonLocal[]): Promise<void>
  insertOriginAbility(abilityData: InsertOriginAbilityDto | InsertOriginAbilityDto[]): Promise<void>
  insertOriginType(typeData: InsertOriginTypeDto | InsertOriginTypeDto[]): Promise<void>
  deleteAllPokemon(): Promise<void>
}
