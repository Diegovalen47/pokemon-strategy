import axios from 'axios'
import type { AxiosInstance } from 'axios'

import { type PokemonRepository } from './pokemon.repository'
import { pokeApi } from '../api'

import { CustomGeneralError } from '@/errors/db'
import { Pokemon } from '@/models/core'
import type { PokemonPokeAPI } from '@/models/pokeapi'

export class PokemonRepositoryImpl implements PokemonRepository {
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

  async getPokemonByNameOrId(
    nameOrId: string | number
  ): Promise<PokemonPokeAPI> {
    try {
      const { data } = await this.pokeApi.get<PokemonPokeAPI>(
        `/pokemon/${nameOrId}`
      )
      return data
    } catch (error) {
      console.error(error)
      throw new CustomGeneralError('Error al obtener el pokemon')
    }
  }
}
