<script setup lang="ts">
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from '@/app/components/ui/command'
import { ScrollArea } from '@/app/components/ui/scroll-area'
import { usePokemonSearch } from '@/app/composables/pokemon'

const { query, filteredPokemonList, selectPokemon } = usePokemonSearch()
</script>

<template>
  <Command>
    <CommandInput
      class="w-full"
      placeholder="Buscar un Pokemon"
      :value="query"
      @input="query = $event.target.value"
    ></CommandInput>
    <CommandList class="mt-1 w-full">
      <ScrollArea class="h-48 w-full">
        <CommandEmpty class="mt-10">
          <div v-if="query === ''" class="flex size-full items-center justify-center">
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
            v-for="pokemon in filteredPokemonList.slice(0, 50)"
            :key="pokemon.id"
            :value="pokemon.name"
            @click="selectPokemon(pokemon)"
          >
            <span class="capitalize">{{ pokemon.name }}</span>
          </CommandItem>
        </CommandGroup>
      </ScrollArea>
    </CommandList>
  </Command>
</template>
