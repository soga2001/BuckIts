<script lang="ts">
import { defineComponent } from 'vue'

definePageMeta({
    title: 'Home',
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
    }
})
</script>

<template>
    <div>
        {{username}} Buckits
    </div>
</template>