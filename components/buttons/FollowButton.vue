<script lang="ts">
import type { UserProfile } from '~/assets/interface/user';
import { useToast } from 'primevue/usetoast';

export default defineComponent({
    props: {
        userProfile: {
            type: Object as PropType<UserProfile>,
            required: true,
        }
    },
    data() {
        return {
            user: this.userProfile,
            following: false,
            hoveringOnFollow: false,
        }
    },
    created() {
        console.log(this.user);
    },
    setup() {
        return {
            route: useRoute(),
            store: useStore(),
        }
    },
    methods: {
        async followUser() {
            console.log(this.user);
            this.following = true;
            const { status, followed, error } = await $fetch<{status: Number, followed: boolean, error: any}>(`/api/profile/follow/`, {
                method: 'POST',
                body: { 
                    is_following: this.user.is_following,
                    id: this.user.id,
                }
            });
            if (error) {
                console.log(error);
                this.store.changeError(error.name);
            }
            else {
                this.$emit('follow', {status, followed});
            }
            this.following = false;

        }
    },
})
</script>

<template>
    <Button @mouseover="hoveringOnFollow = true" @mouseleave="hoveringOnFollow = false" class="follow-btn" variant="outlined"  :class="{ 'following': user.is_following}" :loading="following"  @click="followUser">
        <span  v-if="!user.is_following " class="material-icons-outlined">person_add_alt</span>
        <span v-else-if="hoveringOnFollow" class="material-icons-outlined">person_remove</span>
        <span v-else class="material-icons-outlined">how_to_reg</span>
    </Button>
</template>