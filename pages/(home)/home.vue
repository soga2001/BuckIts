<script lang="ts">
import { defineComponent } from 'vue';

definePageMeta({
  title: 'Home',
  description: 'Home page',
  alias: ['/', '/home'],
  dynamicLayout: 'main',
});

export default defineComponent({
  name: 'App',
  setup() {
    return {
      title: 'Nuxt 3',
    };
  },
});
</script>

<template>
    <div class="w-full">
        <NuxtPage/>
    </div>    
</template>