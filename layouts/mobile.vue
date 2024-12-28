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
    <div class="flex flex-col h-dvh w-full max-w-dvw overflow-hidden" :style="{marginBottom: '56px', marginTop: '56px'}">
        <Toolbar class="fixed w-full top-0 !p-2 !rounded-none !border-none z-10">
            <template #start>
                <div class="flex items-center gap-2">
                    <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" style="width: 32px; height: 32px" />
                </div>
            </template>

            <template #center>
                <div v-if="$route.name" class="flex items-center gap-2 capitalize font-black text-xl">{{ $route.name }}</div>
                <span v-else class="font-normal text-xl">Buck<span class="font-black">IT</span></span>
            </template>

            <template #end>
                <div class="flex items-center gap-2">
                    <ThemeButton />
                </div>
            </template>
        </Toolbar>
        <div class="text-wrap px-2">
            <slot />
        </div>
    </div>
    <div ref="bottomNav" class="bottom-nav flex flex-row tabs w-full bg fixed bottom-0 border-none shadow-2xl border-t border-surface-200 dark:border-surface-800 z-10">
        <NuxtLink to="/home" active-class="active" v-ripple class="tab grow flex items-center py-2 justify-center">
            <i class="default-icon material-icons-outlined !text-xl">cottage</i>
            <i class="active-icon material-icons-round !text-xl">cottage</i>
        </NuxtLink>
        <NuxtLink :to="`/@${store.getUser.user_metadata?.username}`" active-class="active" v-ripple class="tab grow flex items-center justify-center">
            <i class="default-icon material-icons-outlined !text-xl">account_circle</i>
            <i class="active-icon material-icons-round !text-xl">account_circle</i>
        </NuxtLink>
        <NuxtLink :to="`/@${store.getUser.user_metadata?.id}`" active-class="active" v-ripple class="tab grow flex items-center justify-center">
            <i class="default-icon material-icons-outlined !text-xl">account_circle</i>
            <i class="active-icon material-icons-round !text-xl">account_circle</i>
        </NuxtLink>
        <NuxtLink :to="`/@${store.getUser.user_metadata?.full_name}`" active-class="active" v-ripple class="tab grow flex items-center justify-center">
            <i class="default-icon material-icons-outlined !text-xl">account_circle</i>
            <i class="active-icon material-icons-round !text-xl">account_circle</i>
        </NuxtLink>
    </div>
</template>

<style scoped lang="scss">

a {
    border: none;
}

.bottom-nav {
    .active {
        border: none;
        // border-top: 3px inset $primary-color !important;

        .active-icon {
            display: block !important;
        }

        .default-icon {
            display: none !important;
        }

        position: relative;
        &:after {
            content: "";
            background: $primary-color;
            position: absolute;
            top: 0;
            width: 100%;
            height: 3px;
            border-radius: 0 0 5px 5px;
        }
    }

    a {
        .active-icon {
            display: block !important;
        }

        .default-icon {
            display: none !important;
        }
    }
}

</style>