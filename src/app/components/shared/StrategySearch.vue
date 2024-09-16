<script setup lang="ts">
import StrategySearchPokemonInput from './StrategySearchPokemonInput.vue'

import { Skeleton } from '@/app/components/ui/skeleton'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/app/components/ui/tabs'
// TODO: es neceario cachear todos los nombres de los pokemon, para poder darle autocompletado al input
</script>

<template>
  <Tabs default-value="pokemon" class="w-full">
    <TabsList class="w-full">
      <TabsTrigger value="pokemon" class="w-1/2"> Pokemon </TabsTrigger>
      <TabsTrigger value="movement" class="w-1/2"> Movement </TabsTrigger>
    </TabsList>
    <TabsContent value="pokemon">
      <Suspense>
        <StrategySearchPokemonInput />
        <template #fallback>
          <div class="flex flex-col space-y-3">
            <Skeleton class="h-[125px] w-[250px] rounded-xl" />
            <div class="space-y-2">
              <Skeleton class="h-4 w-[250px]" />
              <Skeleton class="h-4 w-[200px]" />
            </div>
          </div>
        </template>
      </Suspense>
    </TabsContent>
    <TabsContent value="movement"> Movement -> Pokemon Input </TabsContent>
  </Tabs>
</template>
