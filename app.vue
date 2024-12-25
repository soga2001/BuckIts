<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
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
const mobile = ref(isMobile);

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

const onResize = () => {
  mobile.value = window.innerWidth <= 768;
};

const closeLoginDialog = () => {
  loginDialog.value = false;
  if (route.query && route.query.login) {
    router.push({});
  } else {
    router.push({ query: route.query });
  }
};

const closeRegisterModal = () => {
  registerModal.value = false;
  if (route.query && route.query.register) {
    router.push({});
  } else {
    router.push({ query: route.query });
  }
};

onBeforeMount(() => {
  toggleDarkMode()
})

onMounted(() => {
  if (route.query) {
    if (route.query.login) {
      loginDialog.value = route.query.login === 'true';
    }
    if (route.query.register) {
      registerModal.value = route.query.register === 'true';
    }
  }

  window.addEventListener("resize", onResize, true)
});

watch(
  () => route,
  (value) => {
    console.log('login', value);
  }
);

watch(
  () => route.query.login,
  (value) => {
    console.log('login', value);
    loginDialog.value = value === 'true';
  }
);

watch(
  () => route.query.register,
  (value) => {
    console.log('register', value);
    registerModal.value = value === 'true';
  }
);

watch(
  () => isMobile,
  (value) => {
    mobile.value = value;
  }
);

</script>


<template>
  <NuxtLayout :name="mobile ? 'mobile' : 'default'">
    <NuxtPage :page-key="route => route.fullPath" :keepalive="{
      exclude: ['login', 'register'],
    }"/>
  </NuxtLayout>
  <Dialog v-model:visible="loginDialog" modal del:visible="visible" pt:root:class="!border-0" pt:mask:class="backdrop-blur-sm" class="w-full" @hide="closeLoginDialog" :style="{ maxWidth: '50rem' }">
      <LoginComponent />
  </Dialog>
  <Dialog v-model:visible="registerModal" modal del:visible="visible" pt:root:class="!border-0" pt:mask:class="backdrop-blur-sm" class="w-full" @hide="closeRegisterModal" :style="{ maxWidth: '50rem' }">
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
</style>