import { type Pokemon } from '@/models/core'

export interface PokemonRepository {
  getPokemonCount(): Promise<number>
  getPokemonFirstList(): Promise<{ next: string; pokemon: Pokemon[] }>
  getPokemonNextList(url: string): Promise<{ next: string; pokemon: Pokemon[] }>
}
