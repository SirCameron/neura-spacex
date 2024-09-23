<template>
  <div class="shadow-md shadow-black/10 py-4 px-4 rounded-lg">
    <div class="flex flex-row items-center">
      <div class="flex-1">
        <div class="font-bold">{{ name }}</div>
        <div class="text-xs">{{ id }}</div>
        <div class="mt-1">{{ date }}</div>
      </div>
      <div v-if="isSaved">
        <div class="w-16 h-16 flex justify-center items-center">
          <CheckIcon size="3x"/> 
        </div>
      </div>
      <div v-if="!isSaved">
        <div class="w-16 h-16 flex justify-center items-center cursor-pointer" @click="$emit('onAdd')">
          <PlusIcon size="3x"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment'
import {Flight} from '~/types'

const { flight, isSaved } = defineProps<{ flight: Flight, isSaved: boolean }>()

const date = moment(flight.date_utc).format('MMMM Do YYYY, h:mm:ss a')
const name = flight.name
const id = flight.id

</script>