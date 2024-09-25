import type { AxiosInstance } from 'axios'
import axios from 'axios'

import type { Ability, AbilityRemoteRepository } from '../../domain'
import { AbilityMapper } from '../mappers'

import { CustomGeneralError } from '@/errors/db'

export class AbilityPokeapiRepository implements AbilityRemoteRepository {
  constructor(private pokeApi: AxiosInstance) {}

  async getAbilitiesFirstList(): Promise<{
    next: string
    abilities: Ability[]
  }> {
    try {
      const { data } = await this.pokeApi.get('/ability')
      const abilitiesList: Ability[] = data.results.map((ability: any) => {
        return AbilityMapper.fromJson(ability)
      })

      return {
        next: data.next,
        abilities: abilitiesList
      }
    } catch (error) {
      console.error(error)
      throw new Error('Error al obtener las habilidades')
    }
  }

  async getAbilitiesNextList(url: string): Promise<{ next: string; abilities: Ability[] }> {
    try {
      const { data } = await axios.get(url)
      const abilitiesList: Ability[] = data.results.map((ability: any) => {
        return AbilityMapper.fromJson(ability)
      })

      return {
        next: data.next,
        abilities: abilitiesList
      }
    } catch (error) {
      console.error(error)
      throw new CustomGeneralError('Error al obtener las hibilidades')
    }
  }

  async getAbilityByNameOrId(nameOrId: string | number): Promise<Ability> {
    try {
      const { data } = await this.pokeApi.get(`/ability/${nameOrId}`)
      return AbilityMapper.fromDetailJson(data)
    } catch (error) {
      console.error(error)
      throw new CustomGeneralError('Error al obtener la habilidad')
    }
  }
}
