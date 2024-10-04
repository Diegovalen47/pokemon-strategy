<script lang="ts" setup>
import { computed } from 'vue'

import type { PokemonFullDetails } from '@/modules/shared/infrastructure/models/app'

const props = defineProps<{
  pokemonFullDetails: PokemonFullDetails
}>()

const damagesReceivedList = computed(() => {
  const damagesReceived = Array.from(props.pokemonFullDetails.damagesReceived.entries())
  const sortedDamagesReceived = damagesReceived.sort((a, b) => a[0] - b[0])
  return sortedDamagesReceived.map(([damageMultiplier, types]) => {
    return {
      damageMultiplier: damageMultiplier,
      types: types.map((type) => type.name)
    }
  })
})
</script>

<template>
  <div class="flex size-full flex-col justify-start gap-4 overflow-auto pt-16">
    <div class="flex flex-col items-center justify-center gap-4 capitalize">
      <h4 class="text-2xl font-bold">{{ pokemonFullDetails.name }}</h4>
      <img
        v-if="pokemonFullDetails.sprite"
        :src="pokemonFullDetails.sprite"
        alt="pokemon"
        class="h-44"
      />
      <p v-else>No sprite</p>
      <div class="flex flex-col justify-center gap-2">
        <h6 class="text-center text-base font-bold">Abilities</h6>
        <div v-for="ability in pokemonFullDetails.abilities" :key="ability.id">
          <strong class="text-[14px]">{{ ability.name }}:</strong>
          <span class="ml-2 text-[10px]">{{ ability.effect }}</span>
        </div>
      </div>
    </div>
    <div class="mb-20 flex flex-col justify-center gap-4">
      <h6 class="text-center text-base font-bold">Damages received</h6>
      <div v-for="damage in damagesReceivedList" :key="damage.damageMultiplier">
        <p>{{ damage.damageMultiplier }}</p>
        <p>{{ damage.types.join(', ') }}</p>
      </div>
    </div>
  </div>
</template>
