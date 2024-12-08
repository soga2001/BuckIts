<script lang="ts">
import { defineComponent } from 'vue'


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
    }
})
</script>

<template>
    <div>
        {{username}} Medias
    </div>
</template>