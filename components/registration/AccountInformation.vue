<script lang="ts">

import { defineComponent } from 'vue'
import { useStore } from '~/stores/stores';

export default defineComponent({
  props: {
    emailProp: {
      type: String,
      required: false,
      default: ""
    },
    passwordProp: {
      type: String,
      required: false,
      default: ""
    },
    confirmPassProp: {
      type: String,
      required: false,
      default: ""
    }
  },
  data() {
      return {
          email: this.emailProp,
          password: this.passwordProp,
          confirmPassword: this.confirmPassProp,
          togglePassword: true,
          toggleConfirmPassword: true,
      }
  },
  methods: {

  },
  watch: {
    email() {
      this.$emit('update:email', this.email)
    },
    password() {
      this.$emit('update:password', this.password)
    },
    confirmPassword() {
      this.$emit('update:confirmPassword', this.confirmPassword)
    },

  },
})
</script>

<template>
    <div>
      <form class="form flex flex-col gap-3 w-full" ref="loginForm" @submit.prevent="">
        <div class="text-center text-2xl font-bold">
            Login Information
        </div>

        <div class="flex flex-col gap-2">
          <div class="flex-column">
            <label>Email</label>
          </div>

          <InputGroup class="input-group">
              <InputGroupAddon class="input-addon">
                <i class="material-icons">email</i>
              </InputGroupAddon>
              <InputText class="input" variant="outlined" v-model="email" placeholder="Enter your email" />
          </InputGroup>
        </div>
          
          
        <div class="flex flex-col gap-2">
          <div class="flex-column">
            <label>Password </label>
          </div>

          <InputGroup class="input-group">
            <InputGroupAddon class="input-addon">
                <span class="material-icons">password</span>
            </InputGroupAddon>
            <Password v-model="password" :feedback="false" toggle-mask placeholder="Enter your password"/>
          </InputGroup>
          <small id="password-help">Password should be longer than 6 letters</small>

        </div>

        <div class="flex flex-col gap-2">
          <div class="flex-column">
            <label>Confirm Password </label>
          </div>

          <InputGroup class="input-group">
            <InputGroupAddon class="input-addon">
                <span class="material-icons">password</span>
            </InputGroupAddon>
            <Password v-model="confirmPassword" :feedback="false" toggle-mask placeholder="Enter your password"/>
          </InputGroup>
        </div>

          
          <div class="flex justify-end">
            <div class="justify-items-start">
            </div>
        

            <p class="flex items-center">Already have an account? 
              <Button as="router-link" class="!bg-transparent text-primary !border-none hover:underline" to="/login">Sign in</Button>
            </p>
          </div>
      </form>
    </div>
</template>

<style lang="scss" scoped>
ion-icon {
    font-size: 1.5rem;
}
</style>