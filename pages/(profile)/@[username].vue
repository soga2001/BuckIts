<script lang="ts">
export default defineComponent({
    data() {
        return {
        }
    },
    setup() {
        const route = useRoute();
        return {route};
    },
})

</script>

<template>
    <div>
        <NuxtLayout name="profile">
            <NuxtPage :username="route.params.username"/>
        </NuxtLayout>
    </div>
</template>