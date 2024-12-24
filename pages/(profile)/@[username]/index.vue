<script setup lang="ts">

const {username} = defineProps<{
    username: string
}>()

definePageMeta({
    name: 'BuckIts',
    keepalive: true,
    auth: true,
})

useHead({
    title: 'BuckIts',
    meta: [
        {
            hid: 'description',
            name: 'description',
            content: 'User media page',
        },
    ],
})

</script>

<template>
    <div>
        {{username}} BuckIts
    </div>
</template>