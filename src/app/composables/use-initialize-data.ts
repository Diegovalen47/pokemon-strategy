import { useQuery } from '@tanstack/vue-query'

import { InitializeDataService } from '@/services/core'

const useInitializeData = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['initializePokemonData'],
    queryFn: async () => {
      const data = await InitializeDataService.initializeData()
      return data
    },
    enabled: false
  })

  const initialize = () => refetch()

  return { data, isLoading, isError, error, initialize }
}

export default useInitializeData
