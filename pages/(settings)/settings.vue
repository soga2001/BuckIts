<script setup lang="ts">

definePageMeta({
    name: 'Settings',
    keepalive: false,
    auth: true,
    redirect: '/settings/account',
})

</script>

<template>
    <div class="w-full h-full grid grid-cols-[minmax(0,550px)_minmax(0,550px)] overflow-y-auto">
        <div>
            <div class="p-2 text-2xl font-black">
                Settings
            </div>
            <div>
                <NuxtLink to="/settings/account" activeClass="active-link" v-ripple class="nav-link !font-medium text-base flex items-center !justify-start cursor-pointer p-3 rounded transition-colors p-ripple">
                    Your account
                </NuxtLink>
                <NuxtLink to="/settings/sessions" activeClass="active-link" v-ripple class="nav-link !font-medium text-base flex items-center !justify-start cursor-pointer p-3 rounded transition-colors p-ripple">
                    Sessions
                </NuxtLink>
            </div>
        </div>
        <div class="border-x border-surface-100 dark:border-surface-700">
            <NuxtPage/>
        </div>
    </div>
</template>

<style lang="scss" scoped>


.active-link {
    position: relative;
    &:after {
        content: "";
        background: $primary-color;
        position: absolute;
        right: 0;
        width: 3px;
        height: 100%;
        border-radius: 0 0 5px 5px;
    }
}

</style>