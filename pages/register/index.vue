

<script lang="ts">

import RegistrationComponent from '@/components/RegistrationComponent.vue';


definePageMeta({
    name: 'Register',
    keepalive: false,
})

export default defineComponent({
  data() {
    return {
      
    }
  },
  setup() {
    
  },

  components: {
    RegistrationComponent
  }
})

</script>

<template>
  <div class="card">
    <RegistrationComponent />
  </div>  
</template>

<style lang="scss" scoped>
.activeStep {
  background-color: rgba(var(--ion-color-primary-rgb), 0.1);

  color: var(--ion-color-primary);

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
    max-width: 760px;
    width: 100%;

    min-height: 500px;
    height: 100%;
}

.buttons {
    
    max-width: 760px;
    width: 100%;
}


.p-fileupload {
    // border-radius: 10px;
    padding: 0;
    width: 100%;
    height: 100%;

}

.p-step {
  
  .p-step-header {
    background-color: var(--ion-color-primary);
    color: var(--ion-color-light);
  }
}

</style>