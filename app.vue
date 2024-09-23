<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
    <div v-if="alerts.length" class="absolute left-0 right-0 top-0 p-8 flex flex-col gap-4 justify-center items-center">
      <div v-for="alert in alerts">
        <div class="rounded-full bg-black text-white text-lg mx-auto px-8 py-2 shadow-lg shadow-black/20">
          {{ alert.message }}
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import {useAlertStore} from '~/stores/alerts'

const alertStore = useAlertStore()
const alerts = computed(() => alertStore.alerts)
</script>
