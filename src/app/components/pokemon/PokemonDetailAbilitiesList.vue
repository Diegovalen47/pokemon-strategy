<script lang="ts" setup>
import type { Ability } from '@/modules/ability/domain'

defineProps<{
  pokemonAbilities: Ability[]
}>()
</script>

<template>
  <div class="flex flex-col justify-center gap-2">
    <h6 class="text-center text-base font-bold">Abilities</h6>
    <div v-for="ability in pokemonAbilities" :key="ability.id" class="text-sm leading-none">
      <strong class="text-[14px]">{{ ability.name }}:</strong>
      <span class="ml-2 text-[10px]">{{ ability.effect }}</span>
    </div>
  </div>
</template>
