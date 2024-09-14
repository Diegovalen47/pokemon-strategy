<script setup lang="ts">
import { shallowRef } from 'vue'
import { RouterView } from 'vue-router'
import BasicLayout from '@/layouts/BasicLayout.vue'
import ThemeToggle from '@/components/shared/ThemeToggle.vue'

const layout = shallowRef(BasicLayout)
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
