<script lang="ts">
import type { UserProfile } from '~/assets/interface/user';
import EditProfile from '~/components/EditProfile.vue';
import { useToast } from 'primevue/usetoast';

export default defineComponent({
    data() {
        return {
            userProfile: {} as UserProfile,
            error: false,
            ssrLoading: true,
            loading: true,
            route: useRoute(),
            following: false,
            hoveringOnFollow: false,
        }
    },
    setup() {
        return {
            route: useRoute(),
            toast: useToast(),
        }
    },
    methods: {
        async fetchSsr() {
            this.ssrLoading = true;
            const { data } = await useFetch<{user: UserProfile, error: Error, status: Number}>(`/api/profile/${this.route.params.username}`);
            const {user, error, status} = data.value as {user: UserProfile | null, error: Error, status: number};
            if (error == null) {
                this.userProfile = user as UserProfile;
                this.error = false;
            }   
            else {
                this.error = true;
            }
            this.ssrLoading = false;
        },
        async fetch() {
            this.loading = true;
            const { user, error, status } = await $fetch<{user: UserProfile, error: Error, status: Number}>(`/api/profile/${this.route.params.username}`);
            // const {user, error, status} = data.value as {user: UserProfile | null, error: Error, status: number};
            if (error == null) {
                this.userProfile = user as UserProfile;
                this.error = false;
            }   
            else {
                this.error = true;
            }
            this.loading = false;
        },
        async followUser() {
            this.following = true;
            const { status, followed, error } = await $fetch<{status: Number, followed: boolean, error: any}>(`/api/profile/follow/`, {
                method: 'POST',
                body: { 
                    is_following: this.userProfile.is_following,
                    id: this.userProfile.id,
                }
            });
            if (error) {
                if(error.name == 'AuthSessionMissingError') {
                    this.$router.push({query: {login: 'true'}});
                }
            }
            else {
                if (status == 200 && followed) {
                    this.userProfile.is_following = followed;
                    this.userProfile.followers += 1;
                } else if(status == 200 && !followed) {
                    this.userProfile.is_following = followed;
                    this.userProfile.followers -= 1;
                }
            }
            this.following = false;

        }
    },
    created() {
        this.fetchSsr();
    },
    mounted() {
        this.loading = false;
    },
    activated() {
        if(this.username != this.userProfile.username) this.fetch();
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
            
        },
        '$route.params.username'(to, from) {
            if (to != from && this.username != this.userProfile.username) this.fetch();
        }
    },
    computed: {
        path() {
            return this.route.path;
        },
        username(): string | string[] {
            return this.route.params.username;
        },
        items() {
            return [
                { route: `/@${this.route.params.username}`, label: 'BuckIts', icon: 'checklist' },
                { route: `/@${this.route.params.username}/media`, label: 'Media', icon: 'image' },
            ]
        }
    },
    components: {
        EditProfile
    }
})
</script>

<template>
    <div class="w-full h-full">
        <div v-if="!error && !loading" class="min-[1010px]:h-80 flex flex-col w-full">
            <div v-if="!loading" class="py-5 min-[1010px]:px-10 min-[1200px]:px-20 min-[1010px]:py-5 flex flex-col min-[1010px]:flex-row justify-center max-[1010px]:items-center min-[1010px]:gap-20 h-full w-full">
                <div class="">
                    <Image v-if="userProfile.avatar_url != ''" :src="userProfile.avatar_url" image-class="rounded-full" class="w-48 h-48 rounded-full border bg-black overflow-hidden" preview/>
                    <Image v-else src="https://primefaces.org/cdn/primevue/images/galleria/galleria10.jpg" alt="Image" preview/>
                </div>
                <div class="flex flex-col max-[1010px]:items-center grow w-full gap-2">
                    <div class="text-3xl flex flex-col min-[1010px]:flex-row items-center gap-2 h-fit">
                        <span v-if="userProfile">{{ userProfile.full_name }}</span>
                        <span v-if="!error" class="text-3xl hidden min-[1010px]:block ">&bull;</span>
                        <span class="text-lg">@{{ username }}</span>
                    </div>
                    <div class="flex flex-row gap-2" v-if="!userProfile.is_user">
                        <Button @mouseover="hoveringOnFollow = true" @mouseleave="hoveringOnFollow = false" class="follow-btn" variant="outlined"  :class="{ 'following': userProfile.is_following}" :loading="following"  @click="followUser">
                            <span  v-if="!userProfile.is_following " class="material-icons-outlined">person_add_alt</span>
                            <span v-else-if="hoveringOnFollow" class="material-icons-outlined">person_remove</span>
                            <span v-else class="material-icons-outlined">how_to_reg</span>
                        </Button>
                        <Button class="btn-secondary !px-6" label="Message" icon="pi pi-comment" />
                    </div>
                    <div class="flex flex-row gap-2" v-if="userProfile.is_user">
                        <EditProfile />
                    </div>
                    <div class="flex flex-row gap-4">
                        <div class="flex flex-col items-center gap-2">
                            <span class="text-sm text-primary">Following</span>
                            <span class="text-sm">{{ userProfile.following }}</span>
                        </div>
                        <Divider layout="vertical" />
                        <div class="flex flex-col items-center gap-2">
                            <span class="text-sm">Followers</span>
                            <span class="text-sm">{{ userProfile.followers }}</span>
                        </div>
                    </div>
                    <div>
                        <p class="text-base font-normal">{{ userProfile.bio }}</p>
                    </div>
                </div>
            </div>

            <div v-if="loading" class="py-5 min-[1010px]:px-10 min-[1200px]:px-20 min-[1010px]:py-5 flex flex-col min-[1010px]:flex-row justify-center max-[1010px]:items-center min-[1010px]:gap-20 gap-5 h-full w-full">
                <div>
                    <Skeleton shape="circle" width="12rem" height="12rem"></Skeleton>
                </div>
                <div class="flex flex-col max-[1010px]:items-center grow w-full min-[1010px]:gap-5 gap-2">
                    <div class="flex flex-col min-[1010px]:flex-row items-center gap-2 h-fit">
                        <Skeleton width="10rem" height="2.4rem"></Skeleton>
                        <span v-if="!error" class="text-3xl">&bull;</span>
                        <span class="text-lg">@{{ username }}</span>
                    </div>
                    <div class="flex flex-row gap-2">
                        <Skeleton width="8rem" height="2.5rem"></Skeleton>
                        <Skeleton width="8rem" height="2.5rem"></Skeleton>
                    </div>
                    <div class="flex flex-row gap-4">
                        <div class="flex flex-col items-center gap-2">
                            <span class=" text-sm">Followers</span>
                            <Skeleton width="4rem" height="2rem"></Skeleton>
                        </div>
                        <Divider layout="vertical" />
                        <div class="flex flex-col items-center gap-2">
                            <span class="text-sm ">Following</span>
                            <Skeleton width="4rem" height="2rem"></Skeleton>
                        </div>
                    </div>
                    <div class="flex flex-col gap-2">
                        <Skeleton width="100%" height="1.3rem"></Skeleton>
                        <Skeleton width="100%" height="1.3rem"></Skeleton>
                        <Skeleton width="100%" height="1.3rem"></Skeleton>
                        <Skeleton width="100%" height="1.3rem"></Skeleton>
                    </div>
                </div>
            </div>
            
            <Tabs v-if="!loading" :value="path" class="border-t dark:border-surface-700">
                <TabList>
                    <Tab class="!p-0 !m-0 " v-for="tab in items" :key="tab.label" :value="tab.route">
                        <NuxtLink class="grow " v-if="tab.route" v-slot="{ href, navigate }" :to="tab.route" custom>
                            <a v-ripple :href="href" @click="navigate" class="flex items-center gap-2">
                                <i class="material-icons">{{ tab.icon }}</i>
                                <span>{{ tab.label }}</span>
                            </a>
                        </NuxtLink>
                    </Tab>
                </TabList>
            </Tabs>
        </div>
        <div v-if="error && !loading" class="flex flex-col w-full">
            <div class="    h-80 w-full">
                <div class="py-5 min-[1010px]:px-10 min-[1200px]:px-20 min-[1010px]:py-5 flex flex-col min-[1010px]:flex-row justify-center min-[1010px]:gap-20 gap-5 h-full w-full ">
                    <div>
                        <div class="bg-black border rounded-full w-48 h-48" alt="Image"> </div>
                    </div>
                    <div class="flex flex-col max-[1010px]:items-center grow w-full min-[1010px]:gap-5 ">
                        <div class="text-3xl flex flex-row items-center gap-2 h-fit">
                            <span class="text-lg">@{{ username }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p class="text-lg text-center font-black">This account doesn't exist.</p>
                <p class="text-xs text-center">Try searching for another user.</p>
            </div>
        </div>

        <div v-if="!loading && !error">
            <slot :user="userProfile" />
        </div>
    </div>
</template>

<style lang="scss">


.follow-btn {
    width: 150px;

    &:after {
        content: "Follow";
    }

    &.following {
        &:after {
            content: "Following";
        }
    }
    
    &:hover, &:hover:not(:disabled) {
        &.following {
            &::after {
                content: "Unfollow";
            }
            background-color: rgba(255, 0, 0, .3) !important;
            border-color: red !important;
            color: red !important;
        }
    }
}
</style>