<script lang="ts">
import { defineComponent } from 'vue'

// import { IonIcon } from '@ionic/vue';
// import type {User} from '@/assets/interface/user.ts'
// import {useStore} from '@/stores/store'
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
    // const store = useStore()
    // const supabase = useSupabaseClient()
    // return {store, supabase}
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
            console.log(response.data.user)
        }
    }
  },
})
</script>

<template>
    <div class="main bg-green">
        <form class="form flex flex-col gap-3" ref="loginForm" @submit.prevent="login">
            <div class="text-3xl font-semibold">
                <h1>Login to your Buck<span class="bg-primary rounded-sm px-2 ml-1">It</span> account</h1>
            </div>
            <!-- <div class="flex-column">
            <label>Email </label>
            </div>

            <ion-input placeholder="Enter your email" fill="outline" v-model="email" :clear-input="true">
            <ion-icon slot="start" :icon="ioniconsAtSharp" aria-hidden="true"></ion-icon>
            </ion-input> -->

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
                <InputText :type="togglePassword ? 'password' : 'text'" class="input" v-model="password" placeholder="Enter your password"/>
                <!-- <Password v-model="password"/> -->
                <!-- <InputGroupAddon class="border-none" v-if="password !== ''">
                    <i class="material-icons" @click="togglePassword = !togglePassword">{{ togglePassword ? "visibility" : "visibility_off" }}</i>
                </InputGroupAddon> -->
              </InputGroup>
            </div>
            
            
            <div class="flex w-full justify-between">
              <div>
              </div>
              <span class="link text-sm">Forgot password?</span>
            </div>
            <div class="flex justify-center">
              <input :disabled="email == '' && password == ''"class="btn text-md font-bold" type="submit" value="Sign In"/>
            </div>
            <p class="flex justify-center gap-2 items-center">
                Don't have an account? 
                <span class="span">
                    <Button class="btn-secondary" href="/register">Sign Up</Button>
                </span>
            </p>

            <div class="separator p-5">
              <hr class="line bg-white">
              <span>Or</span>
              <hr class="line bg-white">
            </div>

            <div class="flex gap-5">
            <button class="btn google">
                <span class="pi pi-google"></span>
                Google 
            </button>
            <button class="btn apple">
                <span class="pi pi-apple"></span>
                Apple 
            </button>
            </div>
        </form>
    </div>
</template>

<style scoped lang="scss">
.main {

    height: 100vh;
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


.button-submit {

  // height: 50px;
  padding: 13px 40px;
  border-radius: 10px;
  border: 1px solid var(--ion-color-primary);
  color: white;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: rgba(var(--ion-color-primary-rgb), 0.2);
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
  background-color: transparent;
  cursor: pointer;
}

// .btn:hover {
//   border-color: var(--ion-color-primary);
//   color: var(--ion-color-primary);

//   & > ion-icon {
//     color: var(--ion-color-primary);
//   }
// }


ion-icon {
  font-size: 1.5rem;
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
  height: 1px;
  border: 0;
}
</style>
  