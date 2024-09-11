<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue'
import { RouterView } from 'vue-router'
import BasicLayout from '@/layouts/BasicLayout.vue'
import ThemeToggle from '@/components/shared/ThemeToggle.vue'

const layout = shallowRef(BasicLayout)
const isMounted = ref(false)

onMounted(() => {
  // Prevents hydration warnings for now
  isMounted.value = true
})
</script>

<template>
  <div v-if="isMounted">
    <component :is="layout">
      <RouterView @update:layout="layout = $event" />
    </component>
    <div class="absolute bottom-3 right-3">
      <ThemeToggle />
    </div>
  </div>
</template>

<style scoped></style>
