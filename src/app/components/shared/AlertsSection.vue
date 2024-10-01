<script lang="ts" setup>
import { Loader2 } from 'lucide-vue-next'
import { ref, watch } from 'vue'

import { useInitialData } from '@/app/composables/services'

const isAlertVisible = ref(false)

const { areSomeLoading, isSuccessAll } = useInitialData()

watch(isSuccessAll, (value) => {
  if (value) {
    setTimeout(() => {
      isAlertVisible.value = false
    }, 5000)
  }
})

watch(areSomeLoading, (value) => {
  if (value) {
    isAlertVisible.value = true
  }
})
</script>

<template>
  <div>
    <div v-if="areSomeLoading" class="flex flex-col space-y-1">
      <div class="flex h-[40px] w-full items-center justify-center gap-2 rounded-xl">
        <Loader2 class="size-3 animate-spin" />
        <span class="text-xs">Guardando en cache...</span>
      </div>
    </div>
    <div
      v-if="isSuccessAll && isAlertVisible"
      class="flex h-[40px] w-full items-center justify-center gap-2 rounded-xl"
    >
      <p class="text-xs text-green-500">Datos guardados en cache</p>
    </div>
  </div>
</template>
