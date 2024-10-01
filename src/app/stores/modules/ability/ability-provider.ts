import type { SqliteRemoteDatabase } from 'drizzle-orm/sqlite-proxy'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { useDatabaseProviderStore } from '../../services/database'

import { AbilityService } from '@/modules/ability/application'
import { AbilityOrmRepository, AbilityPokeapiRepository } from '@/modules/ability/infrastructure'
import { pokeApi } from '@/modules/shared/infrastructure'

export const useAbilityProviderStore = defineStore('ability-provider', () => {
  const databaseStore = useDatabaseProviderStore()

  const abilityServiceInstance = new AbilityService(
    new AbilityPokeapiRepository(pokeApi),
    new AbilityOrmRepository(databaseStore.ormService as SqliteRemoteDatabase)
  )

  const abilityService = ref(abilityServiceInstance)

  return {
    abilityService
  }
})
