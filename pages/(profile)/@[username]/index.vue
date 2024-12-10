<script lang="ts">
import { defineComponent } from 'vue'

definePageMeta({
    name: "profile-buckits",
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