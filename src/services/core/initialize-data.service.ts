import { drizzle } from 'drizzle-orm/sqlite-proxy'
import { SQLocalDrizzle } from 'sqlocal/drizzle'

import {
  AbilityOrmService,
  MovementOrmService,
  PokemonOrmService,
  TypeOrmService
} from '../orm'

import { ResourceAlreadyExists } from '@/errors/db'
import {
  AbilityRepositoryImpl,
  MovementRepositoryImpl,
  PokemonRepositoryImpl,
  TypeRepositoryImpl,
  type PokemonRepository
} from '@/repositories/pokeapi'
import { DatabaseService } from '@/services/db'
import {
  AbilityService,
  MovementService,
  PokemonService,
  TypeService
} from '@/services/pokemon'

const DEFAULT_FILE_NAME = 'pokemondb.sqlite'

export class InitializeDataService {
  static async initializeData(fileName?: string) {
    if (!fileName) {
      fileName = DEFAULT_FILE_NAME
    }

    // Creacion/Conexion a la base de datos local
    const { driver, batchDriver, ...db } = new SQLocalDrizzle(fileName)

    // Separacion DB y ORM y guardamos para retornar al final
    const databaseService = new DatabaseService(db, fileName)
    const ormService = drizzle(driver, batchDriver)
    const servicesToReturn = {
      databaseService,
      ormService
    }

    // Inicializacion de servicios pokemon
    const pokemonRepository = new PokemonRepositoryImpl()
    const pokemonOrmService = new PokemonOrmService(ormService)
    const pokemonService = new PokemonService(
      pokemonRepository,
      pokemonOrmService
    )

    const tablesAlreadyExists: boolean =
      (await databaseService.createTables()) instanceof ResourceAlreadyExists

    if (tablesAlreadyExists) {
      console.log('Local database structure is up to date')
      const hasToReFetch = await this.hasToRefreshData(
        pokemonRepository,
        pokemonOrmService
      )
      if (!hasToReFetch) {
        console.log(
          'Base de datos local actualizada, no es necesario hacer cambios'
        )

        return servicesToReturn
      }
    }

    try {
      await pokemonService.getAllPokemonAndSaveInDb()
      console.log('Pokemon obtenidos y cacheados')

      // Obtener tipos de pokemon y guardar en db
      const typeRepository = new TypeRepositoryImpl()
      const typeOrmService = new TypeOrmService(ormService)
      const typeService = new TypeService(typeRepository, typeOrmService)
      await typeService.getAllTypesAndSaveInDb()
      console.log('Tipos obtenidos y cacheados')
      await typeService.setTypesDamageRelations()
      console.log('Relaciones de daño seteadas en db')

      console.log(
        await typeOrmService.getDamageRelationsForType({
          relation: 'double_damage',
          typeId: 2
        })
      )

      // Obtener habilidades de pokemon y guardar en db
      const abilityRepository = new AbilityRepositoryImpl()
      const abilityOrmService = new AbilityOrmService(ormService)
      const abilityService = new AbilityService(
        abilityRepository,
        abilityOrmService
      )
      await abilityService.getAllAbilitiesAndSaveInDb()
      console.log('Habilidades obtenidas y cacheadas')
      await abilityService.setAbilitiesEffect()
      console.log('Efectos de habilidades seteados en db')

      // Obtener movements de pokemon y guardar en db
      const movementRepository = new MovementRepositoryImpl()
      const movementOrmService = new MovementOrmService(ormService)
      const movementService = new MovementService(
        movementRepository,
        movementOrmService
      )
      await movementService.getAllMovementsAndSaveInDb()
      console.log('Movimientos obtenidas y cacheadas')
      await movementService.setMovementsExtraData()
      console.log('Extra data de movimientos seteados en db')

      await pokemonService.setPokemonExtraData()
      console.log('Datos extra de pokemon seteados en db')

      return servicesToReturn
    } catch (error) {
      console.error('Error al obtener y guardar los pokemon', error)
      throw error
    }
  }

  static async hasToRefreshData(
    pokemonRepository: PokemonRepository,
    pokemonOrmService: PokemonOrmService
  ) {
    const pokemonCountRemote = await pokemonRepository.getPokemonCount()
    const pokemonCountLocal = await pokemonOrmService.getPokemonCount()
    console.log('pokemonCountRemote', pokemonCountRemote)
    console.log('pokemonCountLocal', pokemonCountLocal)

    if (pokemonCountRemote === pokemonCountLocal) {
      return false
    }

    return true
  }
}
