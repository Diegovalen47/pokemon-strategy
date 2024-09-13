import type Pokemon from '@/models/pokemon'

export default interface PokeApiRepository {
  getPokemonCount(): Promise<number>
  getPokemonFirstList(): Promise<Pokemon[]>
}
