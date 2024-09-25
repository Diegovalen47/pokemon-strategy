import { type PokemonLocal } from '../entities/pokemon-local.entity'

export interface PokemonLocalRepository {
  getPokemonCount(): Promise<number>
  getAllPokemon(): Promise<PokemonLocal[]>
  updatePokemonSprite({ id, sprite }: { id: number; sprite: string }): Promise<void>
  searchPokemonByLikeName(query: string): Promise<PokemonLocal[] | Error>
  getOriginAbilitiesCount(): Promise<number>
  getOriginTypesCount(): Promise<number>
  insertPokemon(pokemonData: PokemonLocal | PokemonLocal[]): Promise<void>
  insertOriginAbility({
    pokemonId,
    abilityId,
    slot
  }: {
    pokemonId: number
    abilityId: number
    slot: number
  }): Promise<void>
  insertOriginType({
    pokemonId,
    typeId,
    slot
  }: {
    pokemonId: number
    typeId: number
    slot: number
  }): Promise<void>
}
