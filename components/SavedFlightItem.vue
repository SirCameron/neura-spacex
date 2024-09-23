<template>
  <div class="shadow-md shadow-black/10 py-4 px-4 rounded-lg">
    <div class="flex flex-row items-center">
      <div class="flex-1">
        <div class="font-bold">{{ name }}</div>
        <div class="text-xs">{{ id }}</div>
        <div class="mt-1">{{ date }}</div>
      </div>
      <div class="w-16 h-16 flex justify-center items-center cursor-pointer" @click="$emit('onDelete')">
        <XIcon size="3x" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment'
import {Flight} from '~/types'

const { flight } = defineProps<{ flight: Flight }>()

const date = moment(flight.date_utc).format('MMMM Do YYYY, h:mm:ss a')
const name = flight.name
const id = flight.id

</script>