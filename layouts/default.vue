<script setup lang="ts">
import navbar from '~/components/navbar.vue';

</script>

<template>
  <div class="w-full grid grid-cols-[80px_1fr] min-[1101px]:grid-cols-[300px_minmax(900px,_1fr)] overflow-y-auto">
    <!-- Navbar container -->
    <div class="sticky top-0 border-r border-surface-100 dark:border-surface-700 w-full h-dvh overflow-y-auto">
      <navbar />
    </div>
    <!-- Main content -->
    <div class="h-dvh">
      <slot />
    </div>
  </div>
</template>
