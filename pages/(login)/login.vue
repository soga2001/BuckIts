<script setup lang="ts">
import LoginComponent from '~/components/LoginComponent.vue';

definePageMeta({
    name: 'Login',
    keepalive: false,
    auth: false,
})

useHead({
  title: 'Login',
})

</script>

<template>
    <LoginComponent />
</template>