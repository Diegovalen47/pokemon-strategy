<script setup lang="ts">
import { Paintbrush, Loader2 } from 'lucide-vue-next'
import { computed, ref } from 'vue'

import { Button } from '@/app/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/app/components/ui/tooltip'
import { useGlobalStore } from '@/app/stores/global'
import type { DatabaseService } from '@/services/db'

const globalStore = useGlobalStore()

const isDeleteLoading = ref(false)
const isLoading = computed(() => globalStore.isLoading)
const databaseService = computed(
  () => globalStore.data?.databaseService as DatabaseService
)

const onClick = async () => {
  try {
    isDeleteLoading.value = true
    await databaseService.value.deleteDatabase()
    window.location.reload()
    isDeleteLoading.value = false
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <TooltipProvider>
    <Tooltip :delay-duration="200">
      <TooltipTrigger as-child>
        <Button v-if="!isLoading" variant="outline" @click="onClick">
          <Loader2 v-if="isDeleteLoading" class="size-4 animate-spin" />
          <Paintbrush v-else />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Delete cache</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
