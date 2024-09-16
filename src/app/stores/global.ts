import { defineStore } from 'pinia'

import useInitializeData from '@/app/composables/use-initialize-data'

export const useGlobalStore = defineStore('global', () => {
  const { initialize, isLoading, isError, error, data } = useInitializeData()

  return {
    initialize,
    isLoading,
    isError,
    error,
    data
  }
})
