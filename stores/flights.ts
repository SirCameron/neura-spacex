import { defineStore } from "pinia";
import type { Flight } from "~/types";
import { useAlertStore } from "./alerts";

export enum FetchStatus {
  Idle = "Idle",
  Pending = "pending",
  Success = "success",
}

export const useFlightStore = defineStore("flights", () => {
  const { triggerAlert } = useAlertStore();
  const latestFlights = {
    data: ref<Flight[]>([]),
    status: ref(FetchStatus.Idle),
  };

  const savedFlights = {
    data: ref<Flight[]>([]),
    ids: ref<string[]>([]),
    status: ref(FetchStatus.Idle),
  };

  async function getSavedFlights(forceReload?: boolean) {
    try {
      if (!savedFlights.data.value.length || forceReload) {
        savedFlights.status.value = FetchStatus.Pending;
        const flights = await $fetch<Flight[]>(`/api/flights/saved`);
        savedFlights.data.value = flights;
        savedFlights.ids.value = flights.map((flight) => flight.id);
        savedFlights.status.value = FetchStatus.Success;
      }
    } catch (error) {
      savedFlights.status.value = FetchStatus.Idle;
      triggerAlert("Oops, unable to get saved flights!");
      console.log(error);
    }
  }

  function isSaved(id: string) {
    return savedFlights.ids.value.includes(id);
  }

  async function getLatestFlights() {
    try {
      if (!latestFlights.data.value.length) {
        latestFlights.status.value = FetchStatus.Pending;
        const data = await $fetch<Flight[]>("/api/flights/latest");
        latestFlights.data.value = data;
        latestFlights.status.value = FetchStatus.Success;
      }
    } catch (error) {
      triggerAlert("Oops, unable to get latest flights!");
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
      triggerAlert("Oops, unable to save flight!");
      console.log(error);
    }
  }

  async function deleteSavedFlight(flight: Flight) {
    try {
      await $fetch<{ success: boolean }>(`/api/flight/${flight.id}`, {
        method: "delete",
      });
      getSavedFlights(true);
    } catch (error) {
      triggerAlert("Oops, unable to delete flight!");
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
