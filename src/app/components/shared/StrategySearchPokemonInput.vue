<script setup lang="ts">
import type { SqliteRemoteDatabase } from 'drizzle-orm/sqlite-proxy'

import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from '@/app/components/ui/command'
import { ScrollArea } from '@/app/components/ui/scroll-area'
import usePokemon from '@/app/composables/use-pokemon'

const props = defineProps<{
  ormService: SqliteRemoteDatabase
}>()

const { query, pokemonList, searchPokemon } = usePokemon(props.ormService)

const onInput = async (query: string) => {
  await searchPokemon(query)
}
</script>

<template>
  <Command>
    <CommandInput
      class="w-full"
      placeholder="Search for a Pokemon"
      @input="onInput($event.target.value)"
    ></CommandInput>
    <CommandList class="mt-1 w-full">
      <ScrollArea class="h-48 w-full">
        <CommandEmpty class="mt-10">
          <div
            v-if="query === ''"
            class="flex size-full items-center justify-center"
          >
            <span class="w-60 text-sm text-gray-400">
              Buscar cualquier pokemon para obtener una estrategia contra este
            </span>
          </div>
          <div v-else class="flex size-full items-center justify-center">
            <span class="w-60 text-sm text-gray-400">
              No se encontraron resultados para "{{ query }}"
            </span>
          </div>
        </CommandEmpty>
        <CommandGroup heading="Pokemon">
          <CommandItem
            v-for="pokemon in pokemonList.slice(0, 50)"
            :key="pokemon.id"
            :value="pokemon.name"
          >
            <span class="capitalize">{{ pokemon.name }}</span>
          </CommandItem>
        </CommandGroup>
      </ScrollArea>
    </CommandList>
  </Command>
</template>
