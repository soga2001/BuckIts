<script lang="ts">
import LoginComponent from '~/components/LoginComponent.vue';

definePageMeta({
    name: 'Login',
    keepalive: false,
    // layout: false,
    dynamicLayout: 'main'
})

export default defineComponent({
    data() {
        return {

        }
    },
    components: {
        LoginComponent
    }
})
</script>

<template>
    <LoginComponent />
</template>