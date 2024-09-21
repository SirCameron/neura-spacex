<template>
    <div v-if="flightStatus === 'pending'" class="w-full h-56 flex justify-center items-center text-2xl">
      Loading ...
    </div>
    <div v-if="flightStatus === 'success'" class="pt-4 pb-12 gap-2 flex flex-col">
      <div v-for="flight in flightData">
        <LatestFlightItem :flight="flight" @onAdd="()=>onSave(flight)" :isSaved="isSaved(flight.id)" />
      </div>
    </div>
</template>

<script setup lang="ts">
import { useFlightStore } from '~/stores/flights'

useHead({
  title: 'Latest - SpaceX Launches',
})

const { getLatestFlights, latestFlights, saveFlight, isSaved } = useFlightStore()

onMounted(() => {
  getLatestFlights()
});

const flightStatus = computed(() => latestFlights.status)
const flightData = computed(() => latestFlights.data)

const onSave = (flight:Flight)=>{
  saveFlight(flight)
}
</script>