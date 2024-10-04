<script lang="ts" setup>
import { computed } from 'vue'

import { Badge } from '@/app/components/ui/badge'
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

const colorTypesMapping: Record<number, string> = {
  1: '#8F9963',
  2: '#B5261A',
  3: '#9B81EB',
  4: '#7D3490',
  5: '#E4B85D',
  6: '#AE8B2A',
  7: '#98A918',
  8: '#5A448B',
  9: '#AAA8C6',
  10: '#F1681E',
  11: '#4E78F5',
  12: '#60B741',
  13: '#F5C720',
  14: '#FE4475',
  15: '#86D2D2',
  16: '#5225DD',
  17: '#614435',
  18: '#D793D6',
  19: '#ffffff',
  10001: '#000000',
  10002: '#000000'
}
</script>

<template>
  <div class="mb-20 flex flex-col justify-center">
    <h6 class="text-center text-base font-bold">Strategy</h6>
    <div v-for="damage in damagesReceivedList" :key="damage.damageMultiplier">
      <p>x{{ damage.damageMultiplier }}</p>
      <div class="flex flex-wrap gap-2 py-2">
        <Badge
          v-for="type in damage.types"
          :key="type.id"
          :label="type.name"
          class="px-5 text-sm"
          :style="{ backgroundColor: colorTypesMapping[type.id] }"
        >
          <span class="uppercase text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,0.25)]">{{
            type.name
          }}</span>
        </Badge>
      </div>
    </div>
  </div>
</template>
