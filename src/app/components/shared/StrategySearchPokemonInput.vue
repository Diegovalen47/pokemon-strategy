<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from '@/app/components/ui/command'
import { Input } from '@/app/components/ui/input'
import { useGlobalStore } from '@/app/stores/global'
import type { Pokemon } from '@/models/db'

const globalStore = useGlobalStore()
await globalStore.initialize()

const query = ref('')
const pokemonList = ref<Pokemon[]>([])

const searchPokemon = async (value: string) => {
  if (!value || value === '') return
  const result =
    await globalStore.data?.ormService.searchPokemonByLikeName(value)
  console.log(result)
  return result
}

watch(query, async (value) => {
  const result = await searchPokemon(value)
  if (result instanceof Error) {
    return
  }
  if (result) {
    pokemonList.value = result
  }
})
</script>

<template>
  <Command>
    <Input v-model="query"></Input>
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Results">
        <CommandItem
          v-for="pokemon in pokemonList.slice(0, 5)"
          :key="pokemon.id"
          :value="pokemon.name"
        >
          {{ pokemon.name }}
        </CommandItem>
        <!-- <CommandItem value="search-emoji"> Search Emoji </CommandItem>
        <CommandItem value="calculator"> Calculator </CommandItem> -->
      </CommandGroup>
    </CommandList>
  </Command>
</template>
