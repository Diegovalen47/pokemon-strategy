<script setup lang="ts">
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Skeleton } from '@/components/ui/skeleton'

import { useStoregeStore } from '@/stores/storage'
import { ref } from 'vue'

const storageStore = useStoregeStore()

const inputValue = ref('')

storageStore.initialize()

// const searchPokemon = async (query: string) => {
//   await storageStor
// }
</script>

<template>
  <Command v-if="!storageStore.isLoading">
    <CommandInput placeholder="Search for a pokemon" />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Results">
        <CommandItem value="calendar"> Calendar </CommandItem>
        <CommandItem value="search-emoji"> Search Emoji </CommandItem>
        <CommandItem value="calculator"> Calculator </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
  <div v-else class="flex flex-col space-y-3">
    <Skeleton class="h-[125px] w-[250px] rounded-xl" />
    <div class="space-y-2">
      <Skeleton class="h-4 w-[250px]" />
      <Skeleton class="h-4 w-[200px]" />
    </div>
  </div>
</template>
