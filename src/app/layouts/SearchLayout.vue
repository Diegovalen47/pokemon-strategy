<script lang="ts" setup></script>

<template>
  <header>
    <nav class="flex flex-row justify-center gap-4">
      <RouterLink to="/pokemon">Pokemon</RouterLink>
      <RouterLink to="/movement">Pokemon -> Movement</RouterLink>
    </nav>
  </header>
  <main>
    <slot />
  </main>
</template>
