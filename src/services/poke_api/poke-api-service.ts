import type { AxiosInstance } from 'axios'
import { pokeApi } from './api'
import type PokeApiRepository from '@/repositories/poke-api-repository'
import { PokeApiRepositoryImpl } from '@/repositories/poke-api-repository-impl'
import type Pokemon from '@/models/pokemon'
import type { OrmService } from '../db/orm-service'

export class PokeApiService {
  private pokeApiRepository: PokeApiRepository
  private ormService: OrmService

  constructor(ormService: OrmService) {
    this.pokeApiRepository = new PokeApiRepositoryImpl()
    this.ormService = ormService
    console.log('PokeApiService constructor')
  }

  async getPokemonCount(): Promise<number> {
    return await this.pokeApiRepository.getPokemonCount()
  }

  async getAllPokemonAndSaveInDb(): Promise<void> {
    let { next, pokemon } = await this.pokeApiRepository.getPokemonFirstList()

    while (next) {
      await this.ormService.insertPokemon(pokemon)
      const response = await this.pokeApiRepository.getPokemonNextList(next)
      next = response.next
      pokemon = response.pokemon
    }

    await this.ormService.insertPokemon(pokemon)
  }
}
