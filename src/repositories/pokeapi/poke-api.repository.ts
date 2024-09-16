import type Pokemon from '@/models/core/pokemon'

export interface PokeApiRepository {
  getPokemonCount(): Promise<number>
  getPokemonFirstList(): Promise<{ next: string; pokemon: Pokemon[] }>
  getPokemonNextList(url: string): Promise<{ next: string; pokemon: Pokemon[] }>
}
