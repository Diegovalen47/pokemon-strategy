import type { PokemonLocal, PokemonRemote } from '../entities'

export interface PokemonRemoteRepository {
  getPokemonCount(): Promise<number>
  getPokemonFirstList(): Promise<{ next: string; pokemon: PokemonLocal[] }>
  getPokemonNextList(
    url: string
  ): Promise<{ next: string; pokemon: PokemonLocal[] }>
  getPokemonByNameOrId(nameOrId: string | number): Promise<PokemonRemote>
}
