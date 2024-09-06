<script lang="ts" setup>
import SearchLayout from '@/layouts/SearchLayout.vue'

const emit = defineEmits(['update:layout'])
emit('update:layout', SearchLayout)
</script>

<template>
  <div>Movement -> Pokemon</div>
</template>
