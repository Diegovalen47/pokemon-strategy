<script setup lang="ts">
import { shallowRef } from 'vue'
import { RouterView } from 'vue-router'

const layout = shallowRef('div')
</script>

<template>
  <component :is="layout">
    <RouterView @update:layout="layout = $event" />
  </component>
</template>

<style scoped></style>
