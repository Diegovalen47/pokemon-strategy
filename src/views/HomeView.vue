<script setup lang="ts">
import BasicLayout from '@/layouts/BasicLayout.vue'
import TheMainLogo from '@/components/home/TheMainLogo.vue'
import StrategySearch from '@/components/shared/StrategySearch.vue'

const emit = defineEmits(['update:layout'])
emit('update:layout', BasicLayout)
</script>

<template>
  <div class="flex size-full flex-col md:flex-row">
    <div class="flex size-full items-center justify-center md:w-5/12">
      <TheMainLogo />
    </div>
    <div class="flex size-full items-center justify-center md:w-7/12">
      <StrategySearch />
    </div>
  </div>
</template>
