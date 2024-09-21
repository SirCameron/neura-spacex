import { defineStore } from "pinia";
import type { Flight } from "~/types";

export enum FetchStatus {
  Idle = "Idle",
  Pending = "peinding",
  Success = "success",
}

export const useFlightStore = defineStore("flights", () => {
  const latestFlights = {
    data: ref<Flight[]>([]),
    status: ref(FetchStatus.Idle),
  };

  const savedFlights = ref<Flight[]>([]);
  const savedFlightIds = ref<string[]>([]);

  async function getSavedFlights(forceReload?: boolean) {
    try {
      if (!savedFlights.value.length || forceReload) {
        const flights = await $fetch<Flight[]>(`/api/flights/saved`);
        savedFlights.value = flights;
        savedFlightIds.value = flights.map((flight) => flight.id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function isSaved(id: string) {
    return savedFlightIds.value.includes(id);
  }

  async function getLatestFlights() {
    try {
      latestFlights.status.value = FetchStatus.Pending;
      const data = await $fetch<Flight[]>("/api/flights/latest");
      latestFlights.data.value = data;
      latestFlights.status.value = FetchStatus.Success;
    } catch (error) {
      latestFlights.status.value = FetchStatus.Idle;
      console.log(error);
    }
  }

  async function saveFlight(flight: Flight) {
    try {
      await $fetch<{ success: boolean }>(`/api/flight/${flight.id}`, {
        method: "post",
      });
      getSavedFlights(true);
    } catch (error) {
      console.log("error here");
    }
  }

  async function deleteSavedFlight(flight: Flight) {
    try {
      await $fetch<{ success: boolean }>(`/api/flight/${flight.id}`, {
        method: "delete",
      });
      getSavedFlights(true);
    } catch (error) {
      console.log("error here");
    }
  }

  getSavedFlights();

  return {
    getLatestFlights,
    latestFlights,
    saveFlight,
    savedFlights,
    getSavedFlights,
    isSaved,
    deleteSavedFlight,
  };
});
