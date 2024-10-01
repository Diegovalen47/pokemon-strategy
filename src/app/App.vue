<script setup lang="ts">
import { shallowRef } from 'vue'
import { RouterView } from 'vue-router'

import DeleteCacheButton from './components/shared/DeleteCacheButton.vue'
import { useGlobalStore } from './stores/global'

import AlertsSection from '@/app/components/shared/AlertsSection.vue'
import ThemeToggle from '@/app/components/shared/ThemeToggle.vue'
import BasicLayout from '@/app/layouts/BasicLayout.vue'

const layout = shallowRef(BasicLayout)

const globalStore = useGlobalStore()
globalStore.initializeData()
</script>

<template>
  <div>
    <component :is="layout">
      <RouterView @update:layout="layout = $event" />
    </component>
    <div class="absolute right-3 top-3">
      <AlertsSection />
    </div>
    <div class="absolute bottom-3 right-3">
      <ThemeToggle />
    </div>
    <div class="absolute bottom-3 left-3">
      <DeleteCacheButton />
    </div>
  </div>
</template>

<style scoped></style>
