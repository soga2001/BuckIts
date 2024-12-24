<script lang="ts">

export default defineComponent({
    data() {
        return {

        }
    },
})
</script>

<template>
    <Splitter style="height: 100vh">
        <SplitterPanel class="flex" :size="75">
            <slot /> 
        </SplitterPanel>
        <SplitterPanel class="" :size="25"> 
            Panel 2
        </SplitterPanel>
    </Splitter>
</template>