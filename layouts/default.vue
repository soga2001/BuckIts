<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '~/stores/stores';
import navbar from '~/components/navbar.vue';

export default defineComponent({
  name: 'DefaultLayout',
  setup() {
    return {
        store: useStore()
    }
  }
})
</script>

<template>
    <Splitter style="height: 100vh">
        <SplitterPanel class="flex" :size="25" :minSize="10">
            <navbar />
        </SplitterPanel>
        <SplitterPanel class="" :size="75"> 
            <slot /> 
        </SplitterPanel>
    </Splitter>
</template>