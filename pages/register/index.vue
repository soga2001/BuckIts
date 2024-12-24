<script setup lang="ts">
import RegistrationComponent from '@/components/RegistrationComponent.vue';

definePageMeta({
    name: 'Register',
    keepalive: false,
    auth: false,
})

useHead({
  title: 'Register',
})

</script>

<template>
  <div class="card min-[1010px]:px-20 p-2">
    <RegistrationComponent />
  </div>  
</template>

<style lang="scss" scoped>
.card {
    width: 100%;
    border-radius: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>