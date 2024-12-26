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
    <div class="h-dvh w-full  flex flex-row">
      <div class="shrink border-r border-surface-100 dark:border-surface-700 w-full max-w-80">
          <navbar />
      </div>
      <div class="grow" > 
          <slot /> 
      </div>
    </div>
</template>