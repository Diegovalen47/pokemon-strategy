import type { AxiosInstance } from 'axios'
import axios from 'axios'

import { pokeApi } from '../api'
import type { TypeRepository } from './type.repository'

import { CustomGeneralError } from '@/errors/db'
import { Type } from '@/models/core'
import type { TypePokeAPI } from '@/models/pokeapi'

export class TypeRepositoryImpl implements TypeRepository {
  private pokeApi: AxiosInstance

  constructor() {
    this.pokeApi = pokeApi
  }

  async getTypesFirstList(): Promise<{ next: string; types: Type[] }> {
    try {
      const { data } = await this.pokeApi.get('/type')
      const typesList: Type[] = data.results.map((type: any) => {
        return Type.fromJson(type)
      })

      return {
        next: data.next,
        types: typesList
      }
    } catch (error) {
      console.error(error)
      throw new Error('Error al obtener los tipos')
    }
  }

  async getTypesNextList(
    url: string
  ): Promise<{ next: string; types: Type[] }> {
    try {
      const { data } = await axios.get(url)
      const typesList: Type[] = data.results.map((type: any) => {
        return Type.fromJson(type)
      })

      return {
        next: data.next,
        types: typesList
      }
    } catch (error) {
      console.error(error)
      throw new CustomGeneralError('Error al obtener los pokemon')
    }
  }

  async getTypeByNameOrId(nameOrId: string | number): Promise<TypePokeAPI> {
    try {
      const { data } = await this.pokeApi.get<TypePokeAPI>(`/type/${nameOrId}`)
      return data
    } catch (error) {
      console.error(error)
      throw new CustomGeneralError('Error al obtener la habilidad')
    }
  }
}
