<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '~/stores/stores';
import navbar from '~/components/navbar.vue';

export default defineComponent({
  name: 'DefaultLayout',
  data() {
    return {
        search: "",
        size: 25
    }
  },
  setup() {
    return {
        store: useStore()
    }
  }
})
</script>

<template>
  <div class="w-full grid grid-cols-[80px_1fr] min-[1101px]:grid-cols-[300px_minmax(900px,_1fr)]">
    <!-- Navbar container -->
    <div class="sticky top-0 border-r border-surface-100 dark:border-surface-700 w-full h-dvh overflow-y-auto">
      <navbar />
    </div>
    <!-- Main content -->
    <div class="h-dvh overflow-y-auto">
      <slot />
    </div>
  </div>
</template>
