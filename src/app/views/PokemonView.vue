<script lang="ts" setup>
import { useInitialData } from '../composables/services'

import SearchLayout from '@/app/layouts/SearchLayout.vue'

const emit = defineEmits(['update:layout'])
emit('update:layout', SearchLayout)

const { areSomeLoading, isSuccessAll } = useInitialData()
</script>

<template>
  <div v-if="areSomeLoading">
    <p>Loading...</p>
  </div>
  <div v-else-if="isSuccessAll">
    <p>Success Pokemon</p>
  </div>
</template>
