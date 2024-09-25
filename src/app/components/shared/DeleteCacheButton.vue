<script setup lang="ts">
import { Paintbrush, Loader2 } from 'lucide-vue-next'
import { ref } from 'vue'

import { Button } from '@/app/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/app/components/ui/tooltip'
import { useDatabaseStore } from '@/app/stores/services/database'

const databaseStore = useDatabaseStore()

const isDeleteLoading = ref(false)

const onClick = async () => {
  try {
    isDeleteLoading.value = true
    await databaseStore.databaseService.deleteDatabase()
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
        <Button v-if="databaseStore.isSuccessTables" variant="outline" @click="onClick">
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
