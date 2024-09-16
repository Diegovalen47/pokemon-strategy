<script setup lang="ts">
import { shallowRef } from 'vue'
import { RouterView } from 'vue-router'

import ThemeToggle from '@/app/components/shared/ThemeToggle.vue'
import BasicLayout from '@/app/layouts/BasicLayout.vue'

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
