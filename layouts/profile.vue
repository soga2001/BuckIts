<script lang="ts">
import type { UserMetaData } from '~/assets/interface/user';

export default defineComponent({
    data() {
        return {
            userProfile: {} as UserMetaData,
            error: false,
            loading: true,
            username: this.$route.params.username,
            items: ref([
                { route: `/@${this.$route.params.username}`, label: 'Buckits', icon: 'checklist' },
                { route: `/@${this.$route.params.username}/media`, label: 'Media', icon: 'image' },
            ]),
            path: this.$route.path,
        }
    },
    methods: {
        async fetch() {
            const { data } = await useFetch(`/api/profile/${this.$route.params.username}`);
            const {status, user} = data.value;
            if (status === 200) {
                this.userProfile = user as UserMetaData;
                this.error = false;
            }   
            else {
                this.error = true;
            }
            this.loading = false;
        }
    },
    created() {
        this.fetch();
    },
    watch: {
        userProfile() {
            if (this.userProfile) {
                useHead({
                    titleTemplate: `${this.userProfile.full_name} | %s`,
                })
            }
            else {
                useHead({
                    titleTemplate: `Profile | User Not Found`,
                })
            }
            
        }
    }
})
</script>

<template>
    <div class="h-96 w-full">
        <div v-if="!error" class="px-20 py-10 flex flex-row gap-20 h-full">
                <!-- <img :src="userProfile.avatar" class="w-48 h-48 rounded-full bg-red-50" /> -->
            <Image src="https://primefaces.org/cdn/primevue/images/galleria/galleria10.jpg" alt="Image" preview/>
            <div class="flex flex-col grow w-full gap-2">
                <div class="text-3xl flex flex-row items-center gap-2 h-fit">
                    <span v-if="userProfile">{{ userProfile.full_name }}</span>
                    <span v-if="!error" class="text-3xl text-gray-300">&bull;</span>
                    <span class="text-gray-100 text-lg">@{{ username }}</span>
                </div>
                <div class="flex flex-row gap-2">
                    <Button class="btn" label="Follow" icon="pi pi-user-plus" />
                    <Button class="btn-secondary"  label="Message" icon="pi pi-comment" />
                </div>
                <div>
                    <p class="text-lg text-gray-300">{{ userProfile.bio }}</p>
                    <p class="text-lg text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            </div>
        </div>
        
    </div>
    <Tabs :value="path">
            <TabList>
                <Tab class="" v-for="tab in items" :key="tab.label" :value="tab.route">
                    <router-link class="grow" v-if="tab.route" v-slot="{ href, navigate }" :to="tab.route" custom>
                        <a v-ripple :href="href" @click="navigate" class="flex items-center gap-2 text-inherit">
                            <!-- <i :class="tab.icon" /> -->
                            <i class="material-icons">{{ tab.icon }}</i>
                            <span>{{ tab.label }}</span>
                        </a>
                    </router-link>
                </Tab>
            </TabList>
        </Tabs>
    <div>
        <slot />
    </div>
</template>

<style lang="scss">

</style>