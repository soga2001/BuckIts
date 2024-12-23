<script lang="ts">
import type { UserMetaData, UserProfile } from '~/assets/interface/user';

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
            // this.ssrLoading = false;
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
                console.error(error);
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
        console.log(this.route.params.username);
        if(this.route.params.username != this.userProfile.username) this.fetch();
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
            if(to != from && from != undefined && to != undefined) {
                location.reload()
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
                { route: `/@${this.route.params.username}`, label: 'Buckits', icon: 'checklist' },
                { route: `/@${this.route.params.username}/media`, label: 'Media', icon: 'image' },
            ]
        }
    }
})
</script>

<template>
    <div v-if="!error">
        <div class="h-96 w-full">
            <div v-if="!error && !loading" class="px-20 py-10 flex flex-row gap-20 h-full">
                <div >
                    <Image v-if="userProfile.avatar_url != ''" :src="userProfile.avatar_url" image-class="rounded-full" class="w-48 h-48 rounded-full border bg-black overflow-hidden" preview/>
                    <Image v-else src="https://primefaces.org/cdn/primevue/images/galleria/galleria10.jpg" alt="Image" preview/>
                </div>
                <div class="flex flex-col grow w-full gap-2">
                    <div class="text-3xl flex flex-row items-center gap-2 h-fit">
                        <span v-if="userProfile">{{ userProfile.full_name }}</span>
                        <span v-if="!error" class="text-3xl text-gray-300">&bull;</span>
                        <span class="text-gray-100 text-lg">@{{ username }}</span>
                    </div>
                    <div class="flex flex-row gap-2" v-if="!userProfile.is_user">
                        <Button @mouseover="hoveringOnFollow = true" @mouseleave="hoveringOnFollow = false" class="btn follow-btn"  :class="{ 'following': userProfile.is_following}" :loading="following"  @click="followUser">
                            <span  v-if="!userProfile.is_following " class="material-icons-outlined">person_add_alt</span>
                            <span v-else-if="hoveringOnFollow" class="material-icons-outlined">person_remove</span>
                            <span v-else class="material-icons-outlined">how_to_reg</span>
                        </Button>
                        <Button class="btn-secondary"  label="Message" icon="pi pi-comment" />
                    </div>
                    <div class="flex flex-row gap-2" v-if="userProfile.is_user">
                        <Button  class="btn-secondary" label="Edit Profile" icon="pi pi-user-edit" />
                    </div>
                    <div class="flex flex-row gap-4">
                        <div class="flex flex-col items-center gap-2">
                            <span class="text-sm text-gray-100">Following</span>
                            <span class="text-sm text-gray-300">{{ userProfile.following }}</span>
                        </div>
                        <Divider layout="vertical" />
                        <div class="flex flex-col items-center gap-2">
                            <span class="text-gray-100 text-sm">Followers</span>
                            <span class="text-sm text-gray-300">{{ userProfile.followers }}</span>
                        </div>
                    </div>
                    <div>
                        <p class="text-lg text-gray-300">{{ userProfile.bio }}</p>
                    </div>
                </div>
            </div>

            <div v-if="loading" class="px-20 py-10 flex flex-row gap-10 h-full">
                <div class="flex justify-center ">
                    <Skeleton shape="circle" width="12rem" height="12rem"></Skeleton>
                </div>
                <div class="flex flex-col grow w-full gap-2">
                    <div class="text-3xl flex flex-row items-center gap-2 h-fit">
                        <Skeleton width="10rem" height="2.4rem"></Skeleton>
                        <span v-if="!error" class="text-3xl text-gray-300">&bull;</span>
                        <span class="text-gray-100 text-lg">@{{ username }}</span>
                    </div>
                    <div class="flex flex-row gap-2">
                        <Skeleton width="8rem" height="2.5rem"></Skeleton>
                        <Skeleton width="8rem" height="2.5rem"></Skeleton>
                    </div>
                    <div class="flex flex-row gap-4">
                        <div class="flex flex-col items-center gap-2">
                            <span class="text-gray-100 text-sm">Followers</span>
                            <Skeleton width="4rem" height="2rem"></Skeleton>
                        </div>
                        <Divider layout="vertical" />
                        <div class="flex flex-col items-center gap-2">
                            <span class="text-sm text-gray-100">Following</span>
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
            
        </div>
        <Tabs :value="path">
            <TabList>
                <Tab class="!p-0 !m-0 " v-for="tab in items" :key="tab.label" :value="tab.route">
                    <router-link class="grow " v-if="tab.route" v-slot="{ href, navigate }" :to="tab.route" custom>
                        <a v-ripple :href="href" @click="navigate" class="flex items-center gap-2">
                            <!-- <i :class="tab.icon" /> -->
                            <i class="material-icons">{{ tab.icon }}</i>
                            <span>{{ tab.label }}</span>
                        </a>
                    </router-link>
                </Tab>
            </TabList>
        </Tabs>
    </div>
    <div v-if="error">
        <div class="px-20 py-10 flex flex-row gap-20 h-full">
            <div>
                <div class="bg-black border rounded-full w-48 h-48" alt="Image"> </div>
            </div>
            <div class="flex flex-col grow w-full gap-2">
                <div class="text-3xl flex flex-row items-center gap-2 h-fit">
                    <span v-if="userProfile">{{ userProfile.full_name }}</span>
                    <span v-if="!error" class="text-3xl text-gray-300">&bull;</span>
                    <span class="text-gray-100 text-lg">@{{ username }}</span>
                </div>
                <div>
                    <p class="text-lg text-gray-300">User not found</p>
                </div>
            </div>
        </div>
    </div>

    <div>
        <slot :user="userProfile" />
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
            background-color: rgba(255, 0, 0, .4) !important;
            border-color: red !important;
        }
    }
}
</style>