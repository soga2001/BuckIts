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
            <h1 class=" font-light text-8xl">Buck<span class="font-black">IT</span></h1>
        </div>
        <div class="flex flex-col px-10 justify-start gap-4">
        <Button class="btn-secondary-fill google w-80 rounded-full font-black">
              <span class="pi pi-google"></span>
              Sign up with Google 
          </Button>
          <Button class="btn-secondary-fill apple w-80 rounded-full font-black">
              <span class="pi pi-apple"></span>
              Sign up with Apple 
          </Button>
          - OR -
          <h3 class="text-left">Already have an account?</h3>
          <Button class="w-80" variant="outlined" label="Sign in" @click="$router.push({path: '/', query: {login: 'true'}, replace: true})"/>
        </div>
    </div>
</template>