<script lang="ts">
import { defineComponent } from 'vue'

definePageMeta({
    name: "profile-media",
})

export default defineComponent({
    props: {
        username: {
            type: String,
            required: true,
        },
    },
    data() {
        return {

        }
    },
    mounted() {
        useHead({
            title: `Media`,
        })
    }
})
</script>

<template>
    <div>
        {{username}} Medias
    </div>
</template>