<script setup lang="ts">
import TheMainLogo from '@/app/components/home/TheMainLogo.vue'
import StrategySearch from '@/app/components/shared/StrategySearch.vue'
import BasicLayout from '@/app/layouts/BasicLayout.vue'

const emit = defineEmits(['update:layout'])
emit('update:layout', BasicLayout)
// TODO: make mobile first responsive
</script>

<template>
  <div
    class="flex size-full flex-col justify-center gap-10 md:flex-row md:gap-0"
  >
    <div class="flex w-full items-center justify-center md:h-full md:w-5/12">
      <TheMainLogo />
    </div>
    <div
      class="flex size-full justify-center md:w-5/12 md:flex-col md:items-center"
    >
      <div class="md:h-2/5"></div>
      <StrategySearch class="h-3/5" />
    </div>
  </div>
</template>
