<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import { useInitialData } from '../composables/services'
import { usePokemonLocal } from '../composables/shared'

import { Skeleton } from '@/app/components/ui/skeleton'
import SearchLayout from '@/app/layouts/SearchLayout.vue'

const { getPokemonFullDetails } = usePokemonLocal()

const router = useRouter()
const pokemonName = ref('')
pokemonName.value = router.currentRoute.value.params.name as string

const emit = defineEmits(['update:layout'])
emit('update:layout', SearchLayout)

const { areSomeLoading, isSuccessAll } = useInitialData()

watch(isSuccessAll, async (value) => {
  if (value) {
    const pokemonDetails = await getPokemonFullDetails(pokemonName.value)
    console.log('pokemonDetails', pokemonDetails)
  }
})
</script>

<template>
  <div
    v-if="areSomeLoading"
    class="flex size-full flex-col justify-start gap-4 overflow-auto pt-16"
  >
    <div class="flex flex-col items-center justify-center gap-4">
      <Skeleton class="h-60 w-44" />
      <Skeleton class="h-20 w-full" />
    </div>
    <div class="flex flex-col items-center justify-center gap-4">
      <Skeleton class="h-10 w-full" />
      <Skeleton class="h-10 w-full" />
      <Skeleton class="h-32 w-full" />
      <Skeleton class="h-32 w-full" />
    </div>
  </div>
  <div
    v-else-if="isSuccessAll"
    class="flex size-full flex-col justify-start gap-4 overflow-auto pt-16"
  >
    <div class="flex h-min justify-center">
      <p>Pokemon</p>
    </div>
    <div class="flex w-full items-center justify-center">
      <p>Success</p>
    </div>
  </div>
</template>
