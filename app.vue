<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter, useRoute, type RouteLocationNormalized } from 'vue-router';
import { useFetch } from 'nuxt/app';
import type { User } from './assets/interface/user';
import { useStore } from './stores/stores';
import LoginComponent from './components/LoginComponent.vue';
import RegistrationComponent from './components/RegistrationComponent.vue';

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | BuckIts` : 'BuckIts';
  },
  meta: [
    {
      name: 'description',
      content: 'BuckIts',
    },
  ],
})

const store = useStore();
const { isMobile } = useDevice();
const router = useRouter();
const route = useRoute();

const loginDialog = ref(false);
const registerModal = ref(false);

const getUser = async () => {
  const { data: value } = await useFetch<{ user: User | null; error: string | null }>(
    '/api/getUser'
  );
  if (value.value && !value.value.error) {
    const { user } = value.value;
    store.setUser(user as unknown as User);
    store.changeAuthenticated(true);
  }
};

getUser();

const toggleDarkMode = () => {
  document.documentElement.classList.toggle('my-app-dark');
  store.toggleDark();
};

const openLoginDialog = (value: string) => {
  if(store.isAuthenticated) {
    router.push({ query: {} });
  }
  else {
    loginDialog.value = value === 'true';
  }
}

const openRegisterModal = (value: string) => {
  if(store.isAuthenticated) {
    router.push({ query: {} });
  }
  else {
    registerModal.value = value === 'true';
  }
}

const closeLoginModal = () => {
  loginDialog.value = false;
  if (route.query && route.query.login) {
    store.changeError('');
    router.push({});
  } else {
    router.push({ query: route.query });
  }
};

const closeRegisterModal = () => {
  registerModal.value = false;
  if (route.query && route.query.register) {
    store.changeError('');
    router.push({});
  } else {
    router.push({ query: route.query });
  }
};

const getPageKey = (route: RouteLocationNormalized): string => {
  let temp = ''
  for (const [key, value] of Object.entries(route.params)) {
    temp += `${key}:${value}-`
  }
  return temp || route.fullPath;
};

onBeforeMount(() => {
  toggleDarkMode()
})

onMounted(() => {
  if (route.query) {
    openLoginDialog(route.query.login as string);
    openRegisterModal(route.query.register as string);
  }
});


watch(
  () => store.isAuthenticated,
  (value) => {
    if (value) {
      router.push({ query: {} });
    } 
    else {
      router.push({ path: '/' });
    }
  }
);

watch(
  () => route.query.login,
  (value) => {
    openLoginDialog(value as string);
  }
);

watch(
  () => route.query.register,
  (value) => {
    openRegisterModal(value as string);
  }
);

watch(
  () => store.getError,
  (value) => {
    console.log('error', value);
    if (value == "AuthSessionMissingError") {
      router.push({ query: { login: 'true' } });
    }
    if (value == "AuthSessionExpiredError") {
      router.push({ query: { login: 'true' } });
    }
    if (value == '') {
      router.push({ query: {} });
    }
  }
)

</script>


<template>
  <NuxtLayout>
    <NuxtPage :page-key="getPageKey" keepalive/>
  </NuxtLayout>
  <Dialog :class="{'p-dialog-maximized': isMobile}" :draggable="false" :closeable="false" v-model:visible="loginDialog" modal del:visible="visible" pt:root:class="!border-0" pt:mask:class="backdrop-blur-sm" class="w-full" @hide="closeLoginModal" :style="{ maxWidth: '50rem' }">
    <template #header>
      <div class="w-full flex justify-center items-center gap-2">
        <div class="text-2xl font-normal">
          <h1>Login to your Buck<span class="font-black">IT</span> account</h1>
        </div>
      </div>
    </template>
    <template #closeicon>
      <i class="material-icons absolute">close</i>
    </template>
    <LoginComponent />
  </Dialog>
  <Dialog :class="{'p-dialog-maximized': isMobile}" v-model:visible="registerModal" modal del:visible="visible" pt:root:class="!border-0" pt:mask:class="backdrop-blur-sm" class="w-full" @hide="closeRegisterModal" :style="{ maxWidth: '50rem' }">
    <template #header>
      <div class="w-full flex justify-center items-center gap-2">
        <div class="text-2xl font-normal">
          <h1>Register for a Buck<span class="font-black">IT</span> account</h1>
        </div>
      </div>
    </template>
    <template #closeicon>
      <i class="material-icons absolute">close</i>
    </template>  
    <RegistrationComponent />
  </Dialog>
  <Toast group="authError" class="!w-80" :duration="5000">
      <template #message="slotProps">
          <div class="flex flex-col items-start flex-auto">
              <div class="flex items-center gap-2">
                  <i class="material-icons">{{slotProps.message.icon}}</i>
                  <span class="text-xl font-bold">{{slotProps.message.summary}}</span>
              </div>
              <div class="font-medium text-sm ml-6 my-2">{{ slotProps.message.detail }}</div>
          </div>
      </template>
  </Toast>
</template>


<style lang="scss">
@use "./assets/styles/styles.scss";

.p-dialog-header {
  padding: 10px !important;
}
</style>