<script lang="ts" setup>
import { Badge } from '@/app/components/ui/badge'
import { useColorType } from '@/app/composables/type'
import type { TypeLocal } from '@/modules/type/domain'

defineProps<{
  type: TypeLocal
}>()

const { colorTypesMapping } = useColorType()
</script>

<template>
  <Badge
    :key="type.id"
    :label="type.name"
    class="px-5 text-sm"
    :style="{ backgroundColor: colorTypesMapping[type.id] }"
  >
    <span class="uppercase text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,0.25)]">{{
      type.name
    }}</span>
  </Badge>
</template>
