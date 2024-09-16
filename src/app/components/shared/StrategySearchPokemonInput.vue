<script setup lang="ts">
import type { SqliteRemoteDatabase } from 'drizzle-orm/sqlite-proxy'
import { ref, watch } from 'vue'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from '@/app/components/ui/command'
import { Input } from '@/app/components/ui/input'
import usePokemon from '@/app/composables/use-pokemon'
import type { Pokemon } from '@/models/db'

const props = defineProps<{
  ormService: SqliteRemoteDatabase
}>()

const { pokemonOrmService } = usePokemon(props.ormService)

const query = ref('')
const pokemonList = ref<Pokemon[]>([])

watch(query, async (value) => {
  if (!value || value === '') {
    pokemonList.value = []
    return
  }

  const result = await pokemonOrmService.searchPokemonByLikeName(value)

  if (result instanceof Error) {
    pokemonList.value = []
    return
  }

  if (query.value === '') {
    pokemonList.value = []
    return
  }

  pokemonList.value = result
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
      </CommandGroup>
    </CommandList>
  </Command>
</template>
