<script lang="ts">
import type { UserProfile } from '~/assets/interface/user';
import EditProfile from '~/components/buttons/EditProfile.vue';
import FollowButton from '~/components/buttons/FollowButton.vue';
import { useToast } from 'primevue/usetoast';

export default defineComponent({
    data() {
        return {
            userProfile: {} as UserProfile,
            error: false,
            ssrLoading: true,
            loading: true,
            following: false,
            hoveringOnFollow: false,
        }
    },
    setup() {
        return {
            route: useRoute(),
            toast: useToast(),
            store: useStore(),
        }
    },
    methods: {
        async fetchSsr() {
            this.ssrLoading = true;
            const { data } = await useFetch<{user: UserProfile, error: Error, status: Number}>(`/api/profile/${this.route.params.username}`, {
                key: `profile-${this.route.params.username}`,
            });
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
        async followUser(payload: {status: number, followed: boolean}) {
            const { status, followed } = payload;
            if (status == 200 && followed) {
                this.userProfile.is_following = followed;
                this.userProfile.followers += 1;
            } else if(status == 200 && !followed) {
                this.userProfile.is_following = followed;
                this.userProfile.followers -= 1;
            }
        }
    },
    created() {
        console.log('here')
        this.fetchSsr();
    },
    mounted() {
    },
    watch: {
        userProfile() {
            if (this.userProfile.id) {
                useHead({
                    titleTemplate: `${this.userProfile.full_name} | %s`,
                })
            }
            
        },
        error() {
            if (this.error) {
                useHead({
                    titleTemplate: `Profile | User Not Found`,
                })
            }
        },
        ssrLoading() {
            if (!this.ssrLoading) {
                this.loading = false;
            }
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
        EditProfile,
        FollowButton,
    }
})
</script>

<template>
    <div class="w-full h-full">
        <div class="min-[1010px]:h-80 flex flex-col w-full">
            <div v-if="!loading && !error" class="py-5 min-[1010px]:px-10 min-[1200px]:px-20 min-[1010px]:py-5 flex flex-col min-[1010px]:flex-row justify-center max-[1010px]:items-center min-[1010px]:gap-20 h-full w-full">
                <div class="">
                    <Image v-if="userProfile.avatar_url != ''" :src="userProfile.avatar_url" image-class="rounded-full" class="w-48 h-48 rounded-full border bg-black overflow-hidden" preview/>
                    <Image v-else src="https://primefaces.org/cdn/primevue/images/galleria/galleria10.jpg" alt="Image" class="w-48 h-48 rounded-full border bg-black overflow-hidden" preview/>
                </div>
                <div class="flex flex-col max-[1010px]:items-center grow w-full gap-2">
                    <div class="text-3xl flex flex-col min-[1010px]:flex-row items-center gap-2 h-fit">
                        <span v-if="userProfile">{{ userProfile.full_name }}</span>
                        <span class="text-3xl hidden min-[1010px]:block ">&bull;</span>
                        <span class="text-lg">@{{ username }}</span>
                    </div>
                    <div class="flex flex-row gap-2" v-if="!userProfile.is_user">
                        <FollowButton @follow="followUser" :user-profile="userProfile" />
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
                        <Skeleton shape="circle" width="1rem" height="1rem"></Skeleton>
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

            <div v-if="!loading && error" class="py-5 min-[1010px]:px-10 min-[1200px]:px-20 min-[1010px]:py-5 flex flex-col min-[1010px]:flex-row justify-center max-[1010px]:items-center min-[1010px]:gap-20 h-full w-full">
                <div class="">
                    <Image v-if="userProfile.avatar_url != ''" :src="userProfile.avatar_url" image-class="rounded-full" class="w-48 h-48 rounded-full border bg-black overflow-hidden" preview/>
                    <Image v-else src="https://primefaces.org/cdn/primevue/images/galleria/galleria10.jpg" alt="Image" class="w-48 h-48 rounded-full border bg-black overflow-hidden" preview/>
                </div>
                <div class="flex flex-col max-[1010px]:items-center grow w-full gap-2">
                    <div class="text-3xl flex flex-col min-[1010px]:flex-row items-center gap-2 h-fit">
                        <span v-if="userProfile">{{ userProfile.full_name }}</span>
                        <span class="text-lg">@{{ username }}</span>
                    </div>
                </div>
            </div>
            
            <div v-if="!loading && !error" class="flex flex-row w-full tabs">
                <NuxtLink :to="`/@${route.params.username}`" exact-active-class="active-tab" v-ripple class="tab grow flex items-center cursor-pointer p-4 justify-center">
                    <i class="material-icons-round mr-2">checklist</i>
                    <span>BuckIts</span>
                </NuxtLink>
                <NuxtLink :to="`/@${route.params.username}/media`" exact-active-class="active-tab" v-ripple class="tab grow flex items-center cursor-pointer p-4 justify-center">
                    <i class="material-icons-round mr-2">image</i>
                    <span>Media</span>
                </NuxtLink>
            </div>
        </div>
        <div v-if="!loading" class="mt-5">
            <slot :user="userProfile" />
        </div>
    </div>
</template>

<style lang="scss">

.tabs {
    border-top : 1px solid var(--border-color);
}

.tab {
    border-bottom : 1px solid var(--border-color);

    &:hover {
        background-color: var(--hover-background-color);
    }

    &.active-tab {
        background-color: var(--active-background-color);
        border-bottom: 3px inset var(--p-primary-color);
        font-weight: 900;
        color: var(--text-color);
        // position: relative;
        // &:after {
        //     content: "";
        //     background: $primary-color;
        //     position: absolute;
        //     bottom: 0;
        //     width: 20%;
        //     height: 3px;
        //     border-radius: 5px 5px 0 0;
        // }
    }
}


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