import type { AxiosInstance } from 'axios'
import axios from 'axios'

import type {
  PokemonLocal,
  PokemonRemote,
  PokemonRemoteRepository
} from '../../domain'
import { PokemonMapper } from '../mappers'

import { CustomGeneralError } from '@/errors/db'

export class PokemonPokeapiRepository implements PokemonRemoteRepository {
  constructor(private pokeApi: AxiosInstance) {}

  async getPokemonCount(): Promise<number> {
    try {
      const response = await this.pokeApi.get('/pokemon')
      return Number(response.data.count)
    } catch (error) {
      console.error(error)
      throw new CustomGeneralError('Error al obtener los pokemon')
    }
  }

  async getPokemonFirstList(): Promise<{
    next: string
    pokemon: PokemonLocal[]
  }> {
    try {
      const { data } = await this.pokeApi.get('/pokemon')
      const pokemonList: PokemonLocal[] = data.results.map((pokemon: any) => {
        return PokemonMapper.fromJson(pokemon)
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
  ): Promise<{ next: string; pokemon: PokemonLocal[] }> {
    try {
      const { data } = await axios.get(url)
      const pokemonList: PokemonLocal[] = data.results.map((pokemon: any) => {
        return PokemonMapper.fromJson(pokemon)
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

  async getPokemonByNameOrId(
    nameOrId: string | number
  ): Promise<PokemonRemote> {
    try {
      const { data } = await this.pokeApi.get(`/pokemon/${nameOrId}`)
      return PokemonMapper.fromDetailJson(data)
    } catch (error) {
      console.error(error)
      throw new CustomGeneralError('Error al obtener el pokemon')
    }
  }
}
