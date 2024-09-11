<script setup lang="ts">
import { shallowRef } from 'vue'
import { RouterView } from 'vue-router'
import BasicLayout from '@/layouts/BasicLayout.vue'
import ThemeToggle from '@/components/shared/ThemeToggle.vue'
import { ClientDbService } from './services/db'
import { OrmService } from './services/db/orm-service'

const layout = shallowRef(BasicLayout)

const DBService = new ClientDbService()
await DBService.connect()
const ormService = new OrmService(DBService.getOrm())

const pokemones = await ormService.getAllPokemon()
console.log(pokemones)
</script>

<template>
  <div>
    <component :is="layout">
      <RouterView @update:layout="layout = $event" />
    </component>
    <div class="absolute bottom-3 right-3">
      <ThemeToggle />
    </div>
  </div>
</template>

<style scoped></style>
