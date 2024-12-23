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
    <Splitter style="height: 100vh">
        <SplitterPanel class="flex" :size="25" :minSize="15">
            <navbar />
        </SplitterPanel>
        <SplitterPanel class=""  :size="75" > 
            <slot /> 
        </SplitterPanel>
        <!-- <SplitterPanel class="pt-4" :size="25" :minSize="10">
            <div class="flex justify-center">
                <IconField class="">
                    <InputIcon class="pi pi-search" />
                    <InputText v-model="search" placeholder="Search" />
                </IconField>
            </div>
            <div id="right"></div>
        </SplitterPanel> -->
    </Splitter>
</template>