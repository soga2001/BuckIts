<script lang="ts">
import type { UserProfileInterface } from '~/assets/interface/userProfile';

export default defineComponent({
    data() {
        return {
            userProfile: {} as UserProfileInterface,
            error: false,
            loading: true,
            username: this.$route.params.username,
        }
    },
    methods: {
        async fetch() {
            const { data } = await useFetch(`/api/profile/${this.$route.params.username}`);
            const {status, user} = data.value;
            if (status === 200) {
                this.userProfile = user as UserProfileInterface;
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
        <div v-if="!error" class="px-40 py-10 flex flex-row gap-20 h-full">
            <div class="flex grow-0">
                <img :src="userProfile.avatar" class="w-48 h-48 rounded-full bg-red-50" />
            </div>
            <div class="flex flex-col grow w-full gap-2">
                <div class="text-3xl flex flex-row items-center gap-2 h-fit">
                    <span v-if="userProfile">{{ userProfile.full_name }}</span>
                    <span v-if="!error" class="text-3xl text-gray-300">&bull;</span>
                    <span class="text-gray-100 text-lg">@{{ username }}</span>
                </div>
                <div class="flex flex-row gap-2">
                    <button class="bg-blue-500 text-white px-4 py-2 rounded-md">Follow</button>
                    <button class="bg-gray-500 text-white px-4 py-2 rounded-md">Message</button>
                </div>
                <div>
                    <p class="text-lg text-gray-300">{{ userProfile.bio }}</p>
                    <p class="text-lg text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            </div>
        </div>
        
    </div>
    <div>
        <slot />
    </div>
</template>