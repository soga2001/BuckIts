

<script lang="ts">

import { defineComponent, ref } from 'vue';
import type { User } from '~/assets/interface/user';
import { useStore } from '~/stores/stores';

import UploadAvatar from '~/components/registration/UploadAvatar.vue';
import AccountInformation from '~/components/registration/AccountInformation.vue';
import PersonalInformation from '~/components/registration/PersonalInformation.vue';
import VerifyAccount from '~/components/registration/VerifyAccount.vue';



export default defineComponent({

  data() {
    return {
      activeStep: 1,
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      invalidPassword: false,

      fullname: '',
      phone: '',
      unmaskedPhone: '',
      username: '',
      dob: '',
      bio: '',

      validEmail: true,

      month: '',
      day: '',
      year: '',


      isPassword: true,
      isConfirmPassword: true,

      otp: '',
      invalidOTP: false,
      file: null as File | null,
      imgURL: '',

      registerErrorMessage: '',


      loadingSigningUp: false,

      // user id once signed up
      userId: '',
    }
  },
  setup() {
    const store = useStore()
    const supabase = useSupabaseClient()
    return {store, supabase}
  },
  computed: {
    validAccountInfo() {
      let valid = this.validateEmail() && this.password !== ''  && this.confirmPassword !== '';
      valid = valid && this.password === this.confirmPassword;
      valid = valid && (this.password).length > 6
      return !valid;
    },
    validPersonalInfo() {
      this.removePhoneMask()
        let valid = this.fullname !== '' && (this.unmaskedPhone).length === 10 && this.username !== '' && this.month !== '' && this.day !== '' && this.year !== '';
        return !valid;
    },

  },
  methods: {
    async userExists() {
      const { data } = await this.supabase.from('profiles').select("username").eq('username', this.username);

      if(data?.length) {
        return true;
      }
      return false;
    },

    removePhoneMask() {
      this.unmaskedPhone = this.phone.replace(/\D/g, '');
    },
    async validInfo() {
      let valid = this.validateEmail() && (this.password).length > 6 && this.confirmPassword !== '' && this.password === this.confirmPassword;
      valid = valid && this.fullname !== '' && ((this.unmaskedPhone).length === 10) && this.username !== '' && this.month !== '' && this.day !== '' && this.year !== '';
      return valid;
    },
    validateEmail() {
      const match =  this.email.match(
        /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      );

      return match ? true : false;
    },
    async register() {
      this.loadingSigningUp = true;
      if(!await this.validInfo()) {
        this.registerErrorMessage = 'Please fill in all fields'
        this.loadingSigningUp = false;
        return;
      }

      const {data: {user}, error} = await $fetch('/api/register', {
        method: 'POST',
        body: {
          username: this.username,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword,
          full_name: this.fullname,
          phone: this.unmaskedPhone,
          dob: this.dob,
          month: this.month,
          day: this.day,
          year: this.year,
          bio: this.bio
        }
      })
 
      if(error) {
        if(error.status !== 429) {
          this.registerErrorMessage = error.message;
        }
      } else {
        this.activeStep++;
      }

      this.loadingSigningUp = false;
      
    },
    async submitOTP() {
      const { data: { session }, error} = await this.supabase.auth.verifyOtp({ email: this.email, token: this.otp, type: "email" })


      if(!error) {
        this.userId = session?.user?.id as string;
        this.store.setUser((session?.user as unknown) as User)
        this.store.changeAuthenticated(true)
        navigateTo(this.$route.redirectedFrom?.fullPath || '/')
      }
    },
    activateCallback(step: number) {
        this.activeStep = step;
    },
    prev() {
        this.activeStep--;
    },
    next() {
        this.activeStep++;
    },
  },
  watch: {
    email() {
      if(this.email) {
        this.validEmail = this.validateEmail();
      }
      else {
        this.validEmail = true;
      }
      
    },
    phone() {
      this.removePhoneMask()
    },
  },
  components: {
    UploadAvatar,
    AccountInformation,
    PersonalInformation,
    VerifyAccount,
  }
})

</script>

<template>
  <Stepper :linear="true" v-model:value="activeStep" class="p-5 relative h-dvh">
      <StepList>
          <Step linear v-slot="{value}" asChild :value="1">
              <div class="flex flex-row flex-auto gap-2">
                  <button v-tooltip="'Login Information'" id="account-info" class="bg-transparent border-0 inline-flex flex-col gap-2">
                      <span
                          :class="[
                              'rounded-full border-2 w-12 h-12 inline-flex items-center justify-center',
                              { 'activeStep text-primary-contrast border-primary': (value as number) <= activeStep, 'border-surface-200 dark:border-surface-700': (value as number) > activeStep,
                                  'prevStep': (value as number)
                              }
                          ]"
                      >
                          <i class="pi pi-lock" />
                      </span>
                  </button>
                  <Divider />
              </div>
          </Step>
          <Step linear v-slot="{value}" asChild :value="2">
              <div class="flex flex-row flex-auto gap-2">
                  <button v-tooltip="'Personal Information'" class="bg-transparent border-0 inline-flex flex-col gap-2">
                      <span
                          :class="[
                              'rounded-full border-2 w-12 h-12 inline-flex items-center justify-center',
                              { 'activeStep text-primary-contrast border-primary':(value as number)<= activeStep, 'border-surface-200 dark:border-surface-700':(value as number)> activeStep,
                              'prevStep':(value as number)< activeStep }
                          ]"
                      >
                          <i class="pi pi-user" />
                      </span>
                  </button>
                  <Divider />
              </div>
          </Step>
          <Step linear v-slot="{value}" asChild :value="3">
              <div class="flex flex-row flex-auto gap-2">
                  <button v-tooltip="'Upload Avatar'" class="bg-transparent border-0 inline-flex flex-col gap-2">
                      <span
                          :class="[
                              'rounded-full border-2 w-12 h-12 inline-flex items-center justify-center',
                              { 'activeStep text-primary-contrast border-primary':(value as number)<= activeStep, 'border-surface-200 dark:border-surface-700':(value as number)> activeStep,
                              'prevStep':(value as number)< activeStep }
                          ]"
                      >
                        <i class="pi pi-image" />
                      </span>
                  </button>
                  <Divider />
              </div>
          </Step>
          <Step v-slot="{value}" asChild :value="4">
              <div class="flex flex-row pl-2">
                  <button v-tooltip="'Verify Account'" class="bg-transparent border-0 inline-flex flex-col gap-2" >
                      <span
                          :class="[
                              'rounded-full border-2 w-12 h-12 inline-flex items-center justify-center',
                              { 'activeStep text-primary border-primary':(value as number)<= activeStep, 'border-surface-200 dark:border-surface-700':(value as number)> activeStep,
                              'prevStep':(value as number)< activeStep }
                          ]"
                      >
                            <i class="pi pi-check" />
                      </span>
                  </button>
              </div>
          </Step>
      </StepList>
      
      <StepPanels class="step-panels w-full z-1 overflow-y-auto">
          <StepPanel class="w-full" :value="1">
              <div class="flex w-full flex-col gap-1 mx-auto mt-5" style=" max-width: 600px">

                <AccountInformation :emailProp="email" :passwordProp="password" :confirmPassProp="confirmPassword" v-model:email="email" v-model:password="password" v-model:confirmPassword="confirmPassword"></AccountInformation>
                
                <div class="sticky bottom-2 w-full bg p-2">
                  <div class="flex w-full justify-end ">
                      <Button class="btn" @click="next" :disabled="validAccountInfo">
                      Next
                      <i class="material-icons">arrow_forward</i>
                      </Button>
                  </div>
                </div>
              </div>
          </StepPanel>
          <StepPanel :value="2">
              <div class="flex flex-col gap-1 mx-auto mt-5" style=" max-width: 600px">

                <PersonalInformation 
                  :fullnameProp="fullname" :phoneProp="phone" :usernameProp="username" :monthProp="month" :dayProp="day" :yearProp="year" :bioProp="bio"
                  v-model:dob="dob"
                  v-model:fullname="fullname" v-model:phone="phone" v-model:username="username" v-model:month="month" v-model:day="day" v-model:year="year" v-model:bio="bio"></PersonalInformation>


                <div v-if="registerErrorMessage" class="my-2">
                  <Message severity="error" icon="pi pi-times-circle">{{ registerErrorMessage }}</Message>
                </div>

                <div class="sticky bottom-2 w-full bg p-2">
                  <div class="flex w-full justify-between ">
                    <Button class="btn" @click="prev">
                      <i class="material-icons">arrow_back</i>
                      Prev
                    </Button>

                    <Button class="btn" @click="register" :disabled="validPersonalInfo">
                      Sign Up
                      <i class="material-icons">login</i>
                    </Button>
                  </div>
                </div>
              </div>
          </StepPanel>
          <StepPanel :value="3">
              <div class="w-full flex flex-col gap-2 mx-auto mt-5">
                  <div class="text-center w-full">
                    <UploadAvatar :userId="userId" :username="username" v-model="file"></UploadAvatar>
                    <div class="flex w-full pt-6 justify-between">
                        <Button class="btn" @click="prev">
                          <i class="material-icons">arrow_back</i>
                          Prev
                        </Button>

                        <Button class="btn" @click="register" :disabled="validPersonalInfo">
                          Skip
                          <i class="material-icons">arrow_forward</i>
                        </Button>
                    </div>

                  </div>
              </div>
          </StepPanel>
          <StepPanel :value="4">
              <div class="flex flex-col w-full justify-center gap-5 mx-auto" style="min-height: 16rem; max-width: 24rem">
                  <VerifyAccount :email="email" v-model:otp="otp"></VerifyAccount>
              </div>
              <div class="flex w-full pt-6 justify-start">
                <Button class="btn" @click="prev">
                  <i class="material-icons">arrow_back</i>
                  Prev
                </Button>
              </div>
          </StepPanel>
      </StepPanels>

  </Stepper>
  
</template>

<style lang="scss" scoped>

ion-content {
  --background: transparent !important;
  color: white !important;
}

.activeStep {
  background-color: $primary-color-active !important; 
  color: $primary-color-text !important;

}

.prevStep {
  background-color: $primary-color-light !important;
}


ion-icon {
    font-size: 1.5rem;
}









.card {
    width: 100%;
    padding: 0 30px;
    border-radius: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 760px;
    width: 100%;
}

.step-panels {
    width: 100%;

    min-height: 500px;
    height: 100%;
}

.p-fileupload {
    // border-radius: 10px;
    padding: 0;
    width: 100%;
    height: 100%;

}

.p-step {
  
  .p-step-header {
    background-color: $primary-color;
    color: $primary-color-text;
  }
}

</style>