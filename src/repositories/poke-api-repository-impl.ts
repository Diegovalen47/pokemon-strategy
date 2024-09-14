import { CustomGeneralError } from '@/services/errors/db'
import { pokeApi } from '@/services/poke_api/api'
import axios from 'axios'
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

  async getPokemonFirstList(): Promise<{ next: string; pokemon: Pokemon[] }> {
    try {
      const { data } = await this.pokeApi.get('/pokemon')
      const pokemonList: Pokemon[] = data.results.map((pokemon: any) => {
        return Pokemon.fromJson(pokemon)
      })

      return {
        next: data.next,
        pokemon: pokemonList
      }
    } catch (error) {
      console.error(error)
      throw new CustomGeneralError('Error al obtener los pokemon')
    }
  }

  async getPokemonNextList(
    url: string
  ): Promise<{ next: string; pokemon: Pokemon[] }> {
    try {
      const { data } = await axios.get(url)
      const pokemonList: Pokemon[] = data.results.map((pokemon: any) => {
        return Pokemon.fromJson(pokemon)
      })

      return {
        next: data.next,
        pokemon: pokemonList
      }
    } catch (error) {
      console.error(error)
      throw new CustomGeneralError('Error al obtener los pokemon')
    }
  }
}
