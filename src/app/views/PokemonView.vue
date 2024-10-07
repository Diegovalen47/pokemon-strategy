<script lang="ts" setup>
import { ref, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

import { useInitialData } from '../composables/services'
import { usePokemonLocal } from '../composables/shared'

import PokemonDetail from '@/app/components/pokemon/PokemonDetail.vue'
import { Button } from '@/app/components/ui/button'
import { Skeleton } from '@/app/components/ui/skeleton'
import SearchLayout from '@/app/layouts/SearchLayout.vue'

const emit = defineEmits(['update:layout'])
emit('update:layout', SearchLayout)

const router = useRouter()
const pokemonName = ref('')

pokemonName.value = router.currentRoute.value.params.name as string

const {
  getPokemonFullDetails,
  isLoadingPokemonFullDetails,
  pokemonFullDetails,
  errorPokemonFullDetails
} = usePokemonLocal(pokemonName.value)

const { areSomeLoading, isSuccessAll } = useInitialData()

watchEffect(async () => {
  if (isSuccessAll.value) {
    getPokemonFullDetails()
  }
})

watch(pokemonFullDetails, (value) => {
  console.log('pokemonFullDetails', value)
})
</script>

<template>
  <div
    v-if="areSomeLoading || isLoadingPokemonFullDetails"
    class="flex size-full flex-col justify-start gap-4 overflow-auto pt-16 md:flex-row"
  >
    <div class="flex flex-col items-center justify-center gap-4 md:w-1/2">
      <Skeleton class="h-64 w-44" />
      <Skeleton class="h-28 w-full" />
    </div>
    <div class="flex flex-col items-center justify-center gap-4 md:w-1/2">
      <Skeleton class="h-10 w-full" />
      <Skeleton class="h-10 w-full" />
      <Skeleton class="h-32 w-full" />
      <Skeleton class="h-32 w-full" />
    </div>
  </div>
  <div
    v-else-if="errorPokemonFullDetails"
    class="flex size-full flex-col justify-start gap-4 overflow-auto pt-16"
  >
    <div class="flex h-min justify-center">
      <p>{{ errorPokemonFullDetails }}</p>
    </div>
    <div class="flex w-full items-center justify-center">
      <Button @click="router.push('/')">Volver al inicio</Button>
    </div>
  </div>
  <PokemonDetail
    v-else-if="isSuccessAll && pokemonFullDetails"
    :pokemon-full-details="pokemonFullDetails"
  />
</template>
