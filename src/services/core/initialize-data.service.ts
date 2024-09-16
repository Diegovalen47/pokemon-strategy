import { drizzle } from 'drizzle-orm/sqlite-proxy'
import { SQLocalDrizzle } from 'sqlocal/drizzle'

import { ResourceAlreadyExists } from '@/errors/db'
import { PokeApiImplRepository } from '@/repositories/pokeapi'
import type PokeApiRepository from '@/repositories/pokeapi/poke-api.repository'
import { DatabaseService, OrmService } from '@/services/db'
import { PokemonService } from '@/services/pokemon'

const DEFAULT_FILE_NAME = 'pokemondb.sqlite'

export class InitializeDataService {
  static async initializeData(fileName?: string) {
    if (!fileName) {
      fileName = DEFAULT_FILE_NAME
    }

    const { driver, batchDriver, ...db } = new SQLocalDrizzle(fileName)
    const databaseService = new DatabaseService(db, fileName)
    const ormService = new OrmService(drizzle(driver, batchDriver))
    const pokeApiRepository = new PokeApiImplRepository()
    const pokemonService = new PokemonService(pokeApiRepository, ormService)

    const tablesAlreadyExists: boolean =
      (await databaseService.createTables()) instanceof ResourceAlreadyExists

    if (tablesAlreadyExists) {
      console.log('Local database structure is up to date')
      const hasToReFetch = await this.hasToRefreshData(
        pokeApiRepository,
        ormService
      )
      if (!hasToReFetch) {
        console.log(
          'Base de datos local actualizada, no es necesario hacer cambios'
        )
        return {
          ormService,
          databaseService
        }
      }
    }

    try {
      await pokemonService.getAllPokemonAndSaveInDb()
      return {
        ormService,
        databaseService
      }
    } catch (error) {
      console.error('Error al obtener y guardar los pokemon', error)
      throw error
    }
  }

  static async hasToRefreshData(
    pokeApiRepository: PokeApiRepository,
    ormService: OrmService
  ) {
    const pokemonCountRemote = await pokeApiRepository.getPokemonCount()
    const pokemonCountLocal = await ormService.getPokemonCount()
    console.log('pokemonCountRemote', pokemonCountRemote)
    console.log('pokemonCountLocal', pokemonCountLocal)

    if (pokemonCountRemote === pokemonCountLocal) {
      return false
    }

    return true
  }
}
