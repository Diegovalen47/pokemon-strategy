import { CustomGeneralError } from '@/services/errors/db'
import { pokeApi } from '@/services/poke_api/api'
import type { AxiosInstance } from 'axios'
import type PokeApiRepository from './poke-api-repository'
import Pokemon from '@/models/pokemon'

export class PokeApiRepositoryImpl implements PokeApiRepository {
  private pokeApi: AxiosInstance

  constructor() {
    this.pokeApi = pokeApi
  }

  async getPokemonCount(): Promise<number> {
    try {
      const response = await this.pokeApi.get('/pokemon')
      return Number(response.data.count)
    } catch (error) {
      console.error(error)
      throw new CustomGeneralError('Error al obtener los pokemon')
    }
  }

  async getPokemonFirstList() {
    try {
      const { data } = await this.pokeApi.get('/pokemon')
      return data.results.map((pokemon: any) => {
        return Pokemon.fromJson(pokemon)
      }) as Pokemon[]
    } catch (error) {
      console.error(error)
      throw new CustomGeneralError('Error al obtener los pokemon')
    }
  }
}
