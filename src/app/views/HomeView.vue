<script setup lang="ts">
import TheMainLogo from '@/app/components/home/TheMainLogo.vue'
import StrategySearch from '@/app/components/shared/StrategySearch.vue'
import BasicLayout from '@/app/layouts/BasicLayout.vue'

const emit = defineEmits(['update:layout'])
emit('update:layout', BasicLayout)
// TODO: make mobile first responsive
</script>

<template>
  <div class="flex size-full flex-col justify-center md:flex-row">
    <div class="flex size-full items-center justify-center md:w-5/12">
      <TheMainLogo />
    </div>
    <div class="flex size-full items-center justify-center md:w-5/12">
      <StrategySearch />
    </div>
  </div>
</template>
