<script setup lang="ts">
import type { SqliteRemoteDatabase } from 'drizzle-orm/sqlite-proxy'
import { Loader2 } from 'lucide-vue-next'
import { computed } from 'vue'

import StrategySearchPokemonInput from './StrategySearchPokemonInput.vue'

import { Button } from '@/app/components/ui/button'
import { Skeleton } from '@/app/components/ui/skeleton'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTriggerCarpet
} from '@/app/components/ui/tabs'
import { useGlobalStore } from '@/app/stores/global'

const globalStore = useGlobalStore()
globalStore.initialize()

const isLoading = computed(() => globalStore.isLoading)
const error = computed(() => globalStore.error)
const ormService = computed(
  () => globalStore.data?.ormService as SqliteRemoteDatabase
)
</script>

<template>
  <div class="w-full">
    <Tabs default-value="pokemon">
      <TabsList class="w-full bg-transparent p-0">
        <TabsTriggerCarpet value="pokemon" class="w-1/2">
          Pokemon
        </TabsTriggerCarpet>
        <TabsTriggerCarpet value="movement" class="w-1/2">
          Movement
        </TabsTriggerCarpet>
      </TabsList>
      <TabsContent
        value="pokemon"
        class="mt-0 rounded-2xl rounded-t-none border-4 p-2 data-[state=active]:rounded-se-2xl"
      >
        <!-- <div v-if="error"> -->
        <div v-if="error" class="flex flex-col items-center justify-center">
          <p class="text-red-500">{{ 'Error al cargar los datos' }}</p>
          <Button
            variant="ghost"
            :disabled="isLoading"
            @click="globalStore.initialize()"
          >
            <Loader2 v-if="isLoading" class="size-4 animate-spin" />
            <span v-else> Recargar </span>
          </Button>
        </div>
        <div v-else-if="isLoading" class="flex flex-col space-y-3">
          <div
            class="flex h-[40px] w-full items-center justify-center gap-2 rounded-xl"
          >
            <Loader2 class="size-4 animate-spin" />
            <span class="text-lg">Cargando datos...</span>
          </div>
          <div class="space-y-2">
            <Skeleton class="h-4 w-full" />
            <Skeleton class="h-4 w-full" />
            <Skeleton class="h-4 w-full" />
            <Skeleton class="h-4 w-full" />
            <Skeleton class="h-4 w-full" />
            <Skeleton class="h-4 w-full" />
            <Skeleton class="h-4 w-full" />
            <Skeleton class="h-4 w-full" />
          </div>
        </div>
        <StrategySearchPokemonInput v-else :orm-service="ormService" />
      </TabsContent>
      <TabsContent
        value="movement"
        class="mt-0 rounded-2xl rounded-t-none border-4 p-2 data-[state=active]:rounded-ss-2xl"
      >
        Movement -> Pokemon Input
      </TabsContent>
    </Tabs>
  </div>
</template>
