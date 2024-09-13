import type { AxiosInstance } from 'axios'
import { pokeApi } from './api'
import type PokeApiRepository from '@/repositories/poke-api-repository'
import { PokeApiRepositoryImpl } from '@/repositories/poke-api-repository-impl'

export class PokeApiService {
  private pokeApiRepository: PokeApiRepository

  constructor() {
    this.pokeApiRepository = new PokeApiRepositoryImpl()
  }

  async getPokemonCount(): Promise<number> {
    return await this.pokeApiRepository.getPokemonCount()
  }

  async getAllPokemon() {
    return await this.pokeApiRepository.getPokemonFirstList()
  }
}
