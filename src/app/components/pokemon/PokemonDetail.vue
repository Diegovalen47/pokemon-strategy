<script lang="ts" setup>
import PokemonDetailAbilitiesList from './PokemonDetailAbilitiesList.vue'
import PokemonDetailStrategySection from './PokemonDetailStrategySection.vue'

import TypeBadge from '@/app/components/shared/TypeBadge.vue'
import type { PokemonFullDetails } from '@/modules/shared/infrastructure/models/app'

defineProps<{
  pokemonFullDetails: PokemonFullDetails
}>()
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
      <div class="flex flex-wrap gap-2 py-2">
        <TypeBadge v-for="type in pokemonFullDetails.types" :key="type.id" :type="type" />
      </div>
      <PokemonDetailAbilitiesList :pokemon-abilities="pokemonFullDetails.abilities" />
    </div>
    <PokemonDetailStrategySection :damages-received="pokemonFullDetails.damagesReceived" />
  </div>
</template>
