<script setup lang="ts">
import BasicLayout from '@/layouts/BasicLayout.vue'

const emit = defineEmits(['update:layout'])
emit('update:layout', BasicLayout)
</script>

<template>
  <main>Hola mundo</main>
</template>
