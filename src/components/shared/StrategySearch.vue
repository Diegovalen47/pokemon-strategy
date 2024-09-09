<script setup lang="ts">
import StrategySearchPokemonInput from './StrategySearchPokemonInput.vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// TODO: es neceario cachear todos los nombres de los pokemon, para poder darle autocompletado al input
</script>

<template>
  <Tabs default-value="pokemon" class="w-full">
    <TabsList class="w-full">
      <TabsTrigger value="pokemon" class="w-1/2"> Pokemon </TabsTrigger>
      <TabsTrigger value="movement" class="w-1/2"> Movement </TabsTrigger>
    </TabsList>
    <TabsContent value="pokemon">
      <StrategySearchPokemonInput />
    </TabsContent>
    <TabsContent value="movement"> Movement -> Pokemon Input </TabsContent>
  </Tabs>
</template>
