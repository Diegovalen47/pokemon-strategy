import type { AxiosInstance } from 'axios'
import axios from 'axios'

import type { TypeLocal, TypeRemote, TypeRemoteRepository } from '../../domain'
import { TypeMapper } from '../mappers'

import { CustomGeneralError } from '@/errors/db'

export class TypePokeapiRepository implements TypeRemoteRepository {
  constructor(private pokeApi: AxiosInstance) {}

  async getTypesFirstList(): Promise<{ next: string; types: TypeLocal[] }> {
    try {
      const { data } = await this.pokeApi.get('/type')
      const typesList: TypeLocal[] = data.results.map((type: any) => {
        return TypeMapper.fromJson(type)
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
  ): Promise<{ next: string; types: TypeLocal[] }> {
    try {
      const { data } = await axios.get(url)
      const typesList: TypeLocal[] = data.results.map((type: any) => {
        return TypeMapper.fromJson(type)
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

  async getTypeByNameOrId(nameOrId: string | number): Promise<TypeRemote> {
    try {
      const { data } = await this.pokeApi.get(`/type/${nameOrId}`)
      return TypeMapper.fromDetailJson(data)
    } catch (error) {
      console.error(error)
      throw new CustomGeneralError('Error al obtener la habilidad')
    }
  }
}
