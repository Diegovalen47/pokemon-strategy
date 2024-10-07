<script setup lang="ts">
import { useDatabaseQuery } from '../composables/services'

import TheMainLogo from '@/app/components/home/TheMainLogo.vue'
import StrategySearch from '@/app/components/shared/StrategySearch.vue'
import BasicLayout from '@/app/layouts/BasicLayout.vue'

const emit = defineEmits(['update:layout'])
emit('update:layout', BasicLayout)

const { isSuccessTables, errorTables, isErrorTables } = useDatabaseQuery()
</script>

<template>
  <div class="flex size-full flex-col justify-center gap-2 md:flex-row md:gap-0">
    <div class="flex h-min justify-center md:h-full md:w-5/12 md:flex-col md:items-center">
      <div class="md:h-2/5"></div>
      <div v-if="isErrorTables">
        <p class="text-red-500">{{ errorTables }}</p>
      </div>
      <StrategySearch v-if="isSuccessTables" class="h-3/5" />
    </div>
    <div class="flex w-full items-center justify-center md:h-full md:w-5/12">
      <TheMainLogo />
    </div>
  </div>
</template>
