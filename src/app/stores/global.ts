import { defineStore } from 'pinia'

import useInitializeData from '../composables/use-initialize-data'

export const useGlobalStore = defineStore('global', () => {
  const { data, error, initialize, isError, isLoading } = useInitializeData()

  return {
    initialize,
    isLoading,
    isError,
    error,
    data
  }
})
