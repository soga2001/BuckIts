<script setup lang="ts">

definePageMeta({
    name: 'Home',
    keepalive: false,
    auth: true,
})

</script>

<template>
    <div class="w-full grid min-[800px]:grid-cols-[minmax(500px,_1fr)_400px]">
      <div class="border-none min-[800px]:border-r border-surface-100 dark:border-surface-700 w-full">
        <div v-for="i in 10" :key="i" class="p-4">
          <Card class="w-full">
              <template #header>
                  <!-- <img alt="user header" src="/images/usercard.png" /> -->
              </template>
              <template #title>Advanced Card</template>
              <template #subtitle>Card subtitle</template>
              <template #content>
                  <p class="m-0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
                      quas!
                  </p>
              </template>
              <template #footer>
                  <div class="flex gap-4 mt-1">
                      <Button label="Cancel" severity="secondary" outlined class="w-full" />
                      <Button label="Save" class="w-full" />
                  </div>
              </template>
          </Card>
        </div>
      </div>
      <div class="max-[799px]:hidden border-l border-surface-100 dark:border-surface-700">
        ss more stuff
      </div>
    </div>  
</template>