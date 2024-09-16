<script setup lang="ts">
import type { SqliteRemoteDatabase } from 'drizzle-orm/sqlite-proxy'
import { computed } from 'vue'

import StrategySearchPokemonInput from './StrategySearchPokemonInput.vue'

import { Skeleton } from '@/app/components/ui/skeleton'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/app/components/ui/tabs'
import { useGlobalStore } from '@/app/stores/global'

const globalStore = useGlobalStore()
globalStore.initialize()

const isLoading = computed(() => globalStore.isLoading)
const error = computed(() => globalStore.error)
const data = computed(() => globalStore.data)
const ormService = computed(
  () => globalStore.data?.ormService as SqliteRemoteDatabase
)
</script>

<template>
  <Tabs default-value="pokemon" class="w-full">
    <TabsList class="w-full">
      <TabsTrigger value="pokemon" class="w-1/2"> Pokemon </TabsTrigger>
      <TabsTrigger value="movement" class="w-1/2"> Movement </TabsTrigger>
    </TabsList>
    <TabsContent value="pokemon">
      <div v-if="error">
        <p class="text-red-500">{{ error.message }}</p>
        <button type="button" @click="globalStore.initialize()">
          Recargar
        </button>
      </div>
      <div v-else-if="isLoading" class="flex flex-col space-y-3">
        <Skeleton class="h-[125px] w-[250px] rounded-xl" />
        <div class="space-y-2">
          <Skeleton class="h-4 w-[250px]" />
          <Skeleton class="h-4 w-[200px]" />
        </div>
      </div>
      <StrategySearchPokemonInput v-if="data" :orm-service="ormService" />
    </TabsContent>
    <TabsContent value="movement"> Movement -> Pokemon Input </TabsContent>
  </Tabs>
</template>
