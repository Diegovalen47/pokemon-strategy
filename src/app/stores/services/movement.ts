import type { SqliteRemoteDatabase } from 'drizzle-orm/sqlite-proxy'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { useDatabaseStore } from './database'

import { MovementService } from '@/modules/movement/application'
import { MovementOrmRepository, MovementPokeapiRepository } from '@/modules/movement/infrastructure'
import { pokeApi } from '@/modules/shared/infrastructure'

export const useMovementStore = defineStore('movement', () => {
  const databaseStore = useDatabaseStore()

  const movementServiceInstance = new MovementService(
    new MovementPokeapiRepository(pokeApi),
    new MovementOrmRepository(databaseStore.ormService as SqliteRemoteDatabase)
  )

  const movementService = ref(movementServiceInstance)

  return {
    movementService
  }
})
