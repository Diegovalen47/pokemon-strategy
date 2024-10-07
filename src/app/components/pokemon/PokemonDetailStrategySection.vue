<script lang="ts" setup>
import { computed } from 'vue'

import TypeBadge from '../shared/TypeBadge.vue'

import type { TypeLocal } from '@/modules/type/domain'

const props = defineProps<{
  damagesReceived: Map<number, TypeLocal[]>
}>()

const damagesReceivedList = computed(() => {
  const damagesReceived = Array.from(props.damagesReceived.entries())
  const sortedDamagesReceived = damagesReceived.sort((a, b) => a[0] - b[0])
  return sortedDamagesReceived.map(([damageMultiplier, types]) => {
    return {
      damageMultiplier: damageMultiplier,
      types
    }
  })
})
</script>

<template>
  <h6 class="text-center text-base font-bold">Strategy</h6>
  <div v-for="damage in damagesReceivedList" :key="damage.damageMultiplier">
    <p>x{{ damage.damageMultiplier }}</p>
    <div class="flex flex-wrap gap-2 py-2">
      <TypeBadge v-for="type in damage.types" :key="type.id" :type="type" />
    </div>
  </div>
</template>
