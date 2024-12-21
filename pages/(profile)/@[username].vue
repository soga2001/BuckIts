<script lang="ts">

definePageMeta({
    name: "profile",
    dynamicLayout: "custom-layout",
    // keepalive: true,
    key: "profile, user, user profile",
})

export default defineComponent({
    data() {
        return {
        }
    },
    setup() {
        const route = useRoute()
        return {route}
    },
})  

</script>

<template>
    <NuxtLayout name="profile">
        <NuxtPage :username="route.params.username"/>
    </NuxtLayout>
</template>