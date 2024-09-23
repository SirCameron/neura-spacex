import { defineStore } from "pinia";

type Alert = {
  id: string;
  message: string;
};

export const useAlertStore = defineStore("alerts", () => {
  const alerts = ref<Alert[]>([]);

  function triggerAlert(message: string) {
    const id = Date.now().toString();
    alerts.value = [
      ...alerts.value,
      {
        id,
        message,
      },
    ];
    setTimeout(() => {
      dismissAlert(id);
    }, 3000);
  }

  function dismissAlert(id: string) {
    alerts.value = alerts.value.filter((alert) => alert.id !== id);
  }

  return { alerts, triggerAlert };
});
