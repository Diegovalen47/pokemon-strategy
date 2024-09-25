<script setup lang="ts">
import { watch } from 'vue'

import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from '@/app/components/ui/command'
import { ScrollArea } from '@/app/components/ui/scroll-area'
import { useAbilityQuery } from '@/app/composables/ability'
import { useMovementQuery } from '@/app/composables/movement'
import { usePokemonDetailQuery, usePokemonSearch } from '@/app/composables/pokemon'
import { useDamageRelationsQuery, useTypeQuery } from '@/app/composables/type'

const { query, pokemonList, searchPokemon } = usePokemonSearch()

const { isSuccessType } = useTypeQuery()
const { isSuccessAbility } = useAbilityQuery()
const { getPokemonDetails } = usePokemonDetailQuery()
const { getMovements } = useMovementQuery()
const { getDamageRelations } = useDamageRelationsQuery()

const onInput = async (query: string) => {
  await searchPokemon(query)
}

watch([isSuccessType, isSuccessAbility], ([newIsSuccessType, newIsSuccessAbility]) => {
  if (newIsSuccessType && newIsSuccessAbility) {
    getPokemonDetails()
    getMovements()
    getDamageRelations()
  }
})
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
