<script setup lang="ts">

import items from '~/components/items.vue';

definePageMeta({
    name: 'Account',
    keepalive: false,
    auth: true,
})

</script>

<template>
    <div class="flex flex-col gap-1">
        <div class="p-2">
            <span class="text-xl font-black">Your Account</span>
        </div>
        <div class="text-wrap text-sm text-secondary p-2">
            See and update your account information, change password, or deactive your account.
        </div>
        <div>
            <NuxtLink to="/settings/account">
                <items>
                    <template #icon-left>
                        <i  class="material-icons">person</i>
                    </template>
                    <template #title>
                        Account information
                    </template>
                    <template #description>
                        See your account information like your phone number and email address.
                    </template>
                    <template #icon-right>
                        <i  class="material-icons">chevron_right</i>
                    </template>
                </items>
            </NuxtLink>
            <NuxtLink to="/settings/account">
                <items>
                    <template #icon-left>
                        <i  class="material-icons">password</i>
                    </template>
                    <template #title>
                        Change your password
                    </template>
                    <template #description>
                        Change your password to keep your account secure.
                    </template>
                    <template #icon-right>
                        <i  class="material-icons">chevron_right</i>
                    </template>
                </items>
            </NuxtLink>
            <NuxtLink to="/settings/account">
                <items>
                    <template #icon-left>
                        <i  class="material-icons">heart_broken</i>
                    </template>
                    <template #title>
                        Deactivate your account
                    </template>
                    <template #description>
                        Deactivate your account to stop using BuckIT. If an account has been deactived for more than 30 days, it will be deleted.
                    </template>
                    <template #icon-right>
                        <i  class="material-icons">chevron_right</i>
                    </template>
                </items>
            </NuxtLink>
        </div>
    </div>
</template>


<style lang="scss" scoped>


a {
    display: flex;
    &:hover {
        background-color: var(--hover-background-color) !important;
    }
}

</style>