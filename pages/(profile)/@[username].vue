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
    <NuxtLayout name="profile" v-slot="slotProps">
        
        <NuxtPage v-if="slotProps.user.id" :username="route.params.username"/>
        <div v-else class="flex flex-col items-center justify-center h-full">
            <div class="text-3xl font-bold">
                This account doesn’t exist
            </div>
            <div class="text-lg font-light">
                Try searching for another.
            </div>
        </div>
    </NuxtLayout>
</template>