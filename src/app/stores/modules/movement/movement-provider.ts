import type { SqliteRemoteDatabase } from 'drizzle-orm/sqlite-proxy'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { useDatabaseProviderStore } from '../../services/database'

import { MovementService } from '@/modules/movement/application'
import { MovementOrmRepository, MovementPokeapiRepository } from '@/modules/movement/infrastructure'
import { pokeApi } from '@/modules/shared/infrastructure'

export const useMovementProviderStore = defineStore('movement-provider', () => {
  const databaseStore = useDatabaseProviderStore()

  const movementServiceInstance = new MovementService(
    new MovementPokeapiRepository(pokeApi),
    new MovementOrmRepository(databaseStore.ormService as SqliteRemoteDatabase)
  )

  const movementService = ref(movementServiceInstance)

  return {
    movementService
  }
})
