<script lang="ts">
import { defineComponent } from 'vue';

definePageMeta({
  alias: ['/', '/home'],
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
    <div>
       Hello there
    </div>    
</template>