<script lang="ts">
import { defineComponent } from 'vue'

// import { IonIcon } from '@ionic/vue';
// import type {User} from '@/assets/interface/user.ts'
import {useStore} from '@/stores/stores'
import type { User } from '~/assets/interface/user';


export default defineComponent({
  data() {
    return {
      email: "",
      password: "",

      data: null as any,

      error: '',

      togglePassword: true,

      disabled: true,


    }
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    return {store, route}
  },
  methods: {
    async login() {        
        const response: {error: string, data: {user: User}} = await $fetch('/api/login/withPassword', {
            method: "POST",
            body: {
                email: this.email,
                password: this.password
            }
        })

        if (response.error) {
            this.error = response.error
        } else {
            this.store.setUser(response.data.user)
            this.store.changeAuthenticated(true)
            if(this.$route.query.redirect) {
              console.log('here')
                this.$router.push({path: this.$route.query.redirect as string, query: {}}).then(() => {
                    reloadNuxtApp()
                })
            } 
            this.$route.query.login ? this.$router.push({query: {}}).then(() => {
                reloadNuxtApp()
            }) : this.$router.push('/').then(() => {
                reloadNuxtApp()
            })
        }
    }
  },
  computed: {
    isModal() {
      return this.$route.query.login === 'true'
    }
  }
})
</script>

<template>
    <div class="main bg-green">
        <form class="form flex flex-col gap-3" ref="loginForm" @submit.prevent="login">
            <div class="text-3xl font-semibold">
                <h1>Login to your Buck<span class="font-black">IT</span> account</h1>
            </div>
            <div class="flex flex-col gap-3">
              <div class="flex-column">
                <label>Email</label>
              </div>

              <InputGroup class="input-group">
                  <InputGroupAddon class="input-addon">
                    <span class="material-icons">email</span>
                  </InputGroupAddon>
                  <InputText class="input" variant="outlined" v-model="email" placeholder="Enter your email" />
              </InputGroup>
            </div>

            <div class="flex flex-col gap-3">
              <div class="flex-column">
                <label>Password </label>
              </div>


              <InputGroup class="input-group">
                <InputGroupAddon class="input-addon">
                    <span class="material-icons">password</span>
                </InputGroupAddon>
                <Password v-model="password" :feedback="false" toggle-mask placeholder="Enter your password"/>
              </InputGroup>
            </div>
            
            
            <div class="flex w-full justify-between">
              <div>
              </div>
              <span class="link text-sm">Forgot password?</span>
            </div>
            <div class="flex justify-center">
              <Button :disabled="email == '' && password == ''" variant="outlined" class="text-md font-bold px-20" type="submit" label="Sign In"/>
            </div>
            <p class="flex justify-center items-center">
                Don't have an account? 
                <Button variant="text" as="router-link" class="hover:!bg-transparent hover:underline" :to="isModal ? {query: {register: 'true', redirect: route.query.redirect}} : '/register'">Sign up</Button>
            </p>

            <div class="separator p-5">
              <hr class="line ">
              <span>Or</span>
              <hr class="line">
            </div>

            <div class="flex justify-center gap-5">
            <Button class="btn-secondary google !px-10">
                <span class="pi pi-google"></span>
                Google 
            </Button>
            <Button class="btn-secondary apple !px-10">
                <span class="pi pi-apple"></span>
                Apple 
            </Button>
            </div>
        </form>
    </div>
</template>

<style scoped lang="scss">
.main {

    max-width: 600px;
    padding: 30px 0;
    margin: 0 auto;
    width: 100%;
}





.link {
  margin-left: 5px;
  cursor: pointer;
  
  // capitalize 
  text-transform: capitalize !important;
  text-decoration: underline;



  &:hover {
    color: rgba($primary-color, 0.9);
  
  }
}




.p {
  text-align: center;
  /* color: black; */
  font-size: 14px;
  margin: 5px 0;
}

.btn {
  margin-top: 10px;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  gap: 10px;
  border: 1px solid #ededef;
  // background-color: transparent;/
  cursor: pointer;
}


.separator {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
}

.separator .line {
  display: block;
  width: 100%;
  height: 2px;
  background-color: var(--border-color);
  // border: 0;
}
</style>
  