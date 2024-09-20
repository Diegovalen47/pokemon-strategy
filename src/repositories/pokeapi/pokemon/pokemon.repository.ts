import { type Pokemon } from '@/models/core'
import type { PokemonPokeAPI } from '@/models/pokeapi'

export interface PokemonRepository {
  getPokemonCount(): Promise<number>
  getPokemonFirstList(): Promise<{ next: string; pokemon: Pokemon[] }>
  getPokemonNextList(url: string): Promise<{ next: string; pokemon: Pokemon[] }>
  getPokemonByNameOrId(nameOrId: string | number): Promise<PokemonPokeAPI>
}
