<template>
  <div v-if="flightStatus === 'pending'" class="w-full h-56 flex justify-center items-center text-2xl">
    Loading ...
  </div>
  <div v-if="flightStatus === 'success'" class="pt-4 pb-12 gap-2 flex flex-col">
    <div v-if="flights.length === 0" class="w-full h-56 flex justify-center items-center text-2xl">
      You have not saved any flights...
    </div>
    <div v-for="flight in flights">
      <SavedFlightItem :flight="flight" @onDelete="() => onDelete(flight)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFlightStore } from '~/stores/flights'

useHead({
  title: 'Saved - SpaceX Launches',
})

const { savedFlights, getSavedFlights, deleteSavedFlight } = useFlightStore()

const flights = computed(() => savedFlights.data)
const flightStatus = computed(() => savedFlights.status)

onMounted(() => {
  getSavedFlights()
});

const onDelete = (flight:Flight)=>{
  deleteSavedFlight(flight)
}

</script>