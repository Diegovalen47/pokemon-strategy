import { useQuery } from '@tanstack/vue-query'

import { useAbilityProviderStore } from '@/app/stores/modules/ability'

export const useAbilityQuery = () => {
  const abilityProviderStore = useAbilityProviderStore()

  const {
    isLoading: isLoadingAbility,
    isError: isErrorAbility,
    isSuccess: isSuccessAbility,
    error: errorAbility,
    refetch: getAbilities
  } = useQuery({
    queryKey: ['syncAbilities'],
    queryFn: async () => {
      const abilitiesCacheCount = await abilityProviderStore.abilityService.getAbilitiesLocalCount()

      if (abilitiesCacheCount === 0) {
        await abilityProviderStore.abilityService.getAllAbilitiesAndSaveInDb()
        await abilityProviderStore.abilityService.setAbilitiesEffect()
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
