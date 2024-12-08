<script lang="ts">
import type { UserProfileInterface } from '~/assets/interface/userProfile';

export default defineComponent({
    data() {
        return {
            userProfile: {} as UserProfileInterface,
            error: false,
        }
    },
    setup() {
        const router = useRouter();
        const route = useRoute();
        return {router, route};
    },
    methods: {
        async fetch() {
            const { user, status } = await $fetch(`/api/profile/${this.route.params.username}`);
            if (status === 200) {
                this.userProfile = user as UserProfileInterface;
                this.error = false;
            }
            else {
                this.error = true;
            }
            
        }
    },
    created() {
        this.fetch();
    },
})

</script>

<template>
    <div>
        {{ userProfile.full_name }}
    </div>
    <div>
        <slot />
    </div>
</template>