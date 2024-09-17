import type { AxiosInstance } from 'axios'
import axios from 'axios'

import type { AbilityRepository } from './ability.repository'
import { pokeApi } from '../api'

import { CustomGeneralError } from '@/errors/db'
import { Ability } from '@/models/core'

export class AbilityRepositoryImpl implements AbilityRepository {
  private pokeApi: AxiosInstance

  constructor() {
    this.pokeApi = pokeApi
  }

  async getAbilitiesFirstList(): Promise<{
    next: string
    abilities: Ability[]
  }> {
    try {
      const { data } = await this.pokeApi.get('/ability')
      const abilitiesList: Ability[] = data.results.map((ability: any) => {
        return Ability.fromJson(ability)
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

  async getAbilitiesNextList(
    url: string
  ): Promise<{ next: string; abilities: Ability[] }> {
    try {
      const { data } = await axios.get(url)
      const abilitiesList: Ability[] = data.results.map((ability: any) => {
        return Ability.fromJson(ability)
      })

      return {
        next: data.next,
        abilities: abilitiesList
      }
    } catch (error) {
      console.error(error)
      throw new CustomGeneralError('Error al obtener los pokemon')
    }
  }
}
