<script lang="ts">

export default defineComponent({
    name: 'ThemeButton',
    setup() {
        const store = useStore()
        return {store}
    },
    methods: {
        toggleDarkMode() {
            document.documentElement.classList.toggle('my-app-dark');
            this.store.toggleDark()
        }
    },
    
})
</script>

<template >
    <ClientOnly>
        <Button @click="toggleDarkMode" rounded variant="outlined" class="btn-secondary material-icons !p-1">{{store.getTheme ? 'dark_mode' : 'light_mode'}}</Button>
    </ClientOnly>
</template>