<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '~/stores/stores';
import type { User } from '~/assets/interface/user';
import themeButton from './themeButton.vue';


export default defineComponent({
    name: 'Navbar',
    data() {
        return {
            menuItems: [
                {
                    label: 'Logout',
                    icon: 'logout',
                    command: () => {
                        this.logout();
                    }
                },
            ]
        }
    },
    methods: {
        toggle(event: MouseEvent) {
            (this.$refs.menu as { toggle: (event: Event) => void }).toggle(event);
        },
        async logout() {
            const { error } = await $fetch('/api/logout');
            if(error) {
                console.error("error",error);
            }
            else {
                // console.log("Logged out");
                this.store.setUser({} as User);
                this.store.changeAuthenticated(false);
                reloadNuxtApp({
                    ttl: 1000, // default 10000
                });
            }
        },
    },
    setup() {
        return {
            store: useStore()
        }
    },
    components: {
        themeButton
    }
})
</script>

<template>
    <div class="flex flex-col h-full w-full">
        <div class="flex items-center justify-between px-6 pt-4 shrink-0">
            <span class="inline-flex items-center gap-2">
                <!-- <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="..." fill="var(--p-primary-color)" />
                    <path d="..." fill="var(--p-text-color)" />
                </svg> -->
                <span class="font-normal text-2xl">Buck<span class="font font-black">IT</span></span>
            </span>
            <span>
                <ThemeButton />
            </span>
        </div>
        <div class="overflow-y-auto p-2">
            <ul class="list-none p-0 m-0 flex flex-col gap-1  overflow-hidden">
                <li>
                    <NuxtLink to="/home" activeClass="active-link" v-ripple class="nav-link flex items-center cursor-pointer p-4 rounded transition-colors p-ripple">
                        <i class="material-icons-round mr-2">home</i>
                        <span>Home</span>
                    </NuxtLink>
                </li>
                <li v-if="store.isAuthenticated">
                    
                    <NuxtLink :to="`/@${store.user.user_metadata?.username}`" activeClass="active-link" v-ripple class="nav-link flex items-center cursor-pointer p-4 rounded transition-colors p-ripple">
                        <i class="material-icons-round mr-2">account_circle</i>
                        <span>Profile</span>
                    </NuxtLink>
                </li>
                <li v-if="!store.isAuthenticated">
                    <NuxtLink to="/login" activeClass="active-link" v-ripple class="nav-link flex items-center cursor-pointer p-4 rounded  transition-colors p-ripple">
                        <i class="material-icons-round mr-2">login</i>
                        <span>Login</span>
                    </NuxtLink>
                </li>
                <li v-if="!store.isAuthenticated">
                    <NuxtLink to="/register" activeClass="active-link" v-ripple class="nav-link flex items-center cursor-pointer p-4 rounded  transition-colors p-ripple">
                        <i class="material-icons-round mr-2">person_add</i>
                        <span>Register</span>
                    </NuxtLink>
                </li>
            </ul>
        </div>
        <div class="mt-auto" v-if="store.isAuthenticated">
            <hr class="mb-2 mx-4 border-t border-0 dark:border-surface-700" />
            <a v-ripple @click="toggle" class="hover mx-4 mb-2 flex items-center cursor-pointer p-4 gap-3 rounded  transition-colors p-ripple">
                <Avatar v-if="store.getUserMetaData?.avatar_url" :image="store.getUserMetaData?.avatar_url" size="large" shape="circle" />
                <Avatar v-else image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" size="large" shape="circle" />
                <div class="flex flex-col gap-2">
                    <span class="font-bold">{{ store.getUserMetaData?.full_name }}</span>
                    <span class="text-sm">@{{store.getUserMetaData?.username}}</span>
                </div>
            </a>
            <Menu ref="menu" id="overlay_menu" :model="menuItems" :popup="true">
                <template #item="{ item, props }">
                    <a v-ripple class="flex items-center" v-bind="props.action">
                         <i class="material-icons mr-2">{{ item.icon }}</i>
                        <span>{{ item.label }}</span>
                        <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
                        <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
                    </a>
                </template>
            </Menu>
        </div>
    </div>
</template>