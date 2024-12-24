<script lang="ts">

export default defineComponent({
    name: 'MobileLayout',
    data() {
        return {
            
        }
    },
    setup() {
        const store = useStore()
        const {isMobile} = useDevice()
        const route = useRoute()
        return {store, isMobile, route}
    },
    computed: {
        path() {
            return this.route.path;
        },
        items() {
            return [
                { route: `/`, label: 'Buckits', icon: 'home', requiredAuthentication: true },
                { route: `/@${this.store.getUser.user_metadata?.username}`, label: 'Media', icon: 'person',  requiredAuthentication: true  },
                {route: `/login`, label: 'Login', icon: 'login', requiredAuthentication: false},
                {route: `/register`, label: 'Register', icon: 'register', requiredAuthentication: false},
            ]
        }
    }
})
</script>

<template>
    <div class="flex flex-col h-dvh w-full max-w-dvw overflow-x-hidden">
        <div class="sticky top-0 flex-none border-b border-surface-200 dark:border-surface-800">
            Hello
        </div>
        <div class="grow h-dvh">
            <slot />
        </div>
        <div class="flex-none border-t border-surface-200 dark:border-surface-800 w-full">
            <Tabs :value="path" class="w-full fixed bottom-0">
                <TabList>
                    <Tab class="!p-0 !m-0" v-for="tab in items" :key="tab.label" :value="tab.route">
                        <router-link class="grow " v-if="tab.route" v-slot="{ href, navigate }" :to="tab.route" custom>
                            <a v-ripple :href="href" @click="navigate" class="flex items-center gap-2">
                                <i class="material-icons">{{ tab.icon }}</i>
                            </a>
                        </router-link>
                    </Tab>
                </TabList>
            </Tabs>
        </div>
    </div>
</template>

<style scoped lang="scss">
.active-tab {
    color: $primary-color;
    border-top: 3px inset $primary-color;
    background-color: $primary-background-color-light;
}

</style>