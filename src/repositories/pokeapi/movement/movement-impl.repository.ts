import type { AxiosInstance } from 'axios'
import axios from 'axios'

import type { MovementRepository } from './movement.repository'
import { pokeApi } from '../api'

import { CustomGeneralError } from '@/errors/db'
import { Movement } from '@/models/core'

export class MovementRepositoryImpl implements MovementRepository {
  private pokeApi: AxiosInstance

  constructor() {
    this.pokeApi = pokeApi
  }

  async getMovementsFirstList(): Promise<{
    next: string
    movements: Movement[]
  }> {
    try {
      const { data } = await this.pokeApi.get('/move')
      const movementsList: Movement[] = data.results.map((movement: any) => {
        return Movement.fromJson(movement)
      })

      return {
        next: data.next,
        movements: movementsList
      }
    } catch (error) {
      console.error(error)
      throw new Error('Error al obtener las habilidades')
    }
  }

  async getMovementsNextList(
    url: string
  ): Promise<{ next: string; movements: Movement[] }> {
    try {
      const { data } = await axios.get(url)
      const movementsList: Movement[] = data.results.map((movement: any) => {
        return Movement.fromJson(movement)
      })

      return {
        next: data.next,
        movements: movementsList
      }
    } catch (error) {
      console.error(error)
      throw new CustomGeneralError('Error al obtener las hibilidades')
    }
  }

  async getMovementByNameOrId(nameOrId: string | number): Promise<Movement> {
    try {
      const { data } = await this.pokeApi.get(`/move/${nameOrId}`)
      return Movement.fromDetailJson(data)
    } catch (error) {
      console.error(error)
      throw new CustomGeneralError('Error al obtener la habilidad')
    }
  }
}
