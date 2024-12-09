<script lang="ts">
import { defineComponent } from 'vue'

definePageMeta({
    alias: ['/@:username'],
})

export default defineComponent({
    name: 'Buckits',
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
            title: `Buckits`,
        })
    }
})
</script>

<template>
    <div>
        {{username}} Buckits
    </div>
</template>