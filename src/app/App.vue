<script setup lang="ts">
import { shallowRef } from 'vue'
import { RouterView } from 'vue-router'

import DeleteCacheButton from './components/shared/DeleteCacheButton.vue'
import { useInitialData } from './composables/services'

import AlertsSection from '@/app/components/shared/AlertsSection.vue'
import ThemeToggle from '@/app/components/shared/ThemeToggle.vue'
import BasicLayout from '@/app/layouts/BasicLayout.vue'

const layout = shallowRef(BasicLayout)

const { initializeData } = useInitialData()
initializeData()
</script>

<template>
  <div>
    <component :is="layout">
      <RouterView @update:layout="layout = $event" />
    </component>
    <div class="absolute right-3 top-3 z-50">
      <AlertsSection />
    </div>
    <div class="absolute bottom-3 right-3 z-50">
      <ThemeToggle />
    </div>
    <div v-if="false" class="absolute bottom-3 left-3 z-50">
      <DeleteCacheButton />
    </div>
    <div class="absolute bottom-3 left-1/2 w-1/2 -translate-x-1/2 text-[10px] leading-none">
      <p>
        Esta es una app solo para uso de la comunidad. Las imágenes, nombres, formas y otra
        información relevante de Pokémon son propiedad de The Pokémon Company.
      </p>
    </div>
  </div>
</template>

<style scoped></style>
