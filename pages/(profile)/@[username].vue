<script lang="ts">
export default defineComponent({
    data() {
        return {
        }
    },
})

</script>

<template>
    <div>
        <NuxtLayout name="profile">
            <NuxtPage :username="$route.params.username"/>
        </NuxtLayout>
    </div>
</template>