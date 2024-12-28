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
    <div class="h-dvh w-full grid grid-cols-[80px_1fr] min-[1101px]:grid-cols-[300px_minmax(900px,_1fr)]">
      <div class="border-r border-surface-100 dark:border-surface-700 w-full">
          <navbar />
      </div>
      <div  > 
          <slot /> 
      </div>
    </div>
</template>