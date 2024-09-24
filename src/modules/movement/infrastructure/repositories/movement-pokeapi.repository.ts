import type { AxiosInstance } from 'axios'
import axios from 'axios'

import type { Movement, MovementRemoteRepository } from '../../domain'
import { MovementMapper } from '../mappers'

import { CustomGeneralError } from '@/errors/db'

export class MovementPokeapiRepository implements MovementRemoteRepository {
  constructor(private pokeApi: AxiosInstance) {}

  async getMovementsFirstList(): Promise<{
    next: string
    movements: Movement[]
  }> {
    try {
      const { data } = await this.pokeApi.get('/move')
      const movementsList: Movement[] = data.results.map((movement: any) => {
        return MovementMapper.fromJson(movement)
      })

      return {
        next: data.next,
        movements: movementsList
      }
    } catch (error) {
      console.error(error)
      throw new Error('Error al obtener las movements')
    }
  }

  async getMovementsNextList(
    url: string
  ): Promise<{ next: string; movements: Movement[] }> {
    try {
      const { data } = await axios.get(url)
      const movementsList: Movement[] = data.results.map((movement: any) => {
        return MovementMapper.fromJson(movement)
      })

      return {
        next: data.next,
        movements: movementsList
      }
    } catch (error) {
      console.error(error)
      throw new CustomGeneralError('Error al obtener las movements')
    }
  }

  async getMovementByNameOrId(nameOrId: string | number): Promise<Movement> {
    try {
      const { data } = await this.pokeApi.get(`/move/${nameOrId}`)
      return MovementMapper.fromDetailJson(data)
    } catch (error) {
      console.error(error)
      throw new CustomGeneralError('Error al obtener la movement')
    }
  }
}
