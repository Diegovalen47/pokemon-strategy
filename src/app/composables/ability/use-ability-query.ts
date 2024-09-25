import { useQuery } from '@tanstack/vue-query'

import { useAbilityStore } from '@/app/stores/services'

export const useAbilityQuery = () => {
  const abilityStore = useAbilityStore()

  const {
    isLoading: isLoadingAbility,
    isError: isErrorAbility,
    isSuccess: isSuccessAbility,
    error: errorAbility,
    refetch: getAbilities
  } = useQuery({
    queryKey: ['syncAbilities'],
    queryFn: async () => {
      const abilitiesCacheCount = await abilityStore.abilityService.getAbilitiesLocalCount()

      if (abilitiesCacheCount === 0) {
        await abilityStore.abilityService.getAllAbilitiesAndSaveInDb()
        await abilityStore.abilityService.setAbilitiesEffect()
        console.log('Abilities obtenidos y cacheados')
        return true
      }
      return false
    },
    enabled: false
  })

  return {
    isLoadingAbility,
    isErrorAbility,
    isSuccessAbility,
    errorAbility,
    getAbilities
  }
}
