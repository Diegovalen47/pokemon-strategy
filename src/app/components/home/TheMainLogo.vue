<script setup lang="ts">
import { AspectRatio } from '@/app/components/ui/aspect-ratio'
</script>

<template>
  <div class="w-44 md:w-[400px]">
    <AspectRatio>
      <img
        src="/src/app/assets/img/pokemon_strategy_logo.png"
        alt="PokeStrategy Logo"
        class="object-cover"
      />
    </AspectRatio>
  </div>
</template>
