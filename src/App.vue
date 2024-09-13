<script setup lang="ts">
import { shallowRef } from 'vue'
import { RouterView } from 'vue-router'
import BasicLayout from '@/layouts/BasicLayout.vue'
import ThemeToggle from '@/components/shared/ThemeToggle.vue'

import { useStoregeStore } from './stores/storage'

const storageStore = useStoregeStore()

const layout = shallowRef(BasicLayout)

storageStore.initialize()
</script>

<template>
  <div v-if="!storageStore.isLoading">
    <component :is="layout">
      <RouterView @update:layout="layout = $event" />
    </component>
    <div class="absolute bottom-3 right-3">
      <ThemeToggle />
    </div>
  </div>
  <div v-else>...Loading</div>
</template>

<style scoped></style>
