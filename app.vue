<script lang="ts">
import type { User } from './assets/interface/user';
import { useStore } from './stores/stores';
import UploadAvatar from './components/registration/UploadAvatar.vue';

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore()
    return {store}
  },
  methods: {
    async getUser() {      
      const {data: {value}} = await useFetch<{
        user: User | null,
        error: string | null
      }>('/api/getUser')
      if (value && !value.error) {
        const {user} = value 
        this.store.setUser(user as unknown as User)
        this.store.changeAuthenticated(true)
      }
    }
  },
  created() {
    this.getUser()
  },
  components: {
    UploadAvatar
  }
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage keepalive/>
  </NuxtLayout>
</template>


<style lang="scss">
@use "./assets/styles/styles.scss";
</style>