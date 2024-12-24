<script setup lang="ts">

const {username} = defineProps<{
    username: string
}>()

definePageMeta({
    name: 'Media',
    keepalive: true,
    auth: true,
})

useHead({
    title: 'Media',
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
        {{username}} Medias
    </div>
</template>