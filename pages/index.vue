<script setup lang="ts">

definePageMeta({
    keepalive: false,
    auth: false,
    layout: false,
})

</script>

<template>
    <div class="w-full h-dvh grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center">
        <div class="flex flex-col items-center gap-4">
            <h1 class="text-4xl font-bold">Welcome to BuckIT</h1>
            <p class="text-lg">Please login to continue</p>
        </div>
        <div class="flex flex-col items-center gap-4">
        <Button class="btn-secondary google w-80 rounded-full">
              <span class="pi pi-google"></span>
              Google 
          </Button>
          <Button class="btn-secondary apple w-80 rounded-full">
              <span class="pi pi-apple"></span>
              Apple 
          </Button>
          - OR -
          <Button class="w-80" variant="outlined" label="Login" @click="$router.push({path: '/', query: {login: 'true'}, replace: true})"/>
          <Button as="router-link" class="btn-secondary w-80" label="Register" :to="{path: '/', query: {register: 'true'}, replace: true}" />
        </div>
    </div>
</template>