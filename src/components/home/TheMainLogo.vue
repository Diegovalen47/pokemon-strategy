<script setup lang="ts">
import { AspectRatio } from '@/components/ui/aspect-ratio'
</script>

<template>
  <div class="w-24 sm:w-32 md:w-[600px]">
    <AspectRatio>
      <img
        src="/src/assets/img/pokemon_strategy_logo.png"
        alt="PokeStrategy Logo"
        class="object-cover"
      />
    </AspectRatio>
  </div>
</template>
