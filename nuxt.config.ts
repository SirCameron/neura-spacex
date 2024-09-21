// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "nuxt-feather-icons"],
  imports: { dirs: ["./stores"] },
  pinia: {
    storesDirs: ["./stores/**"],
  },
  tailwindcss: {
    cssPath: ["./assets/css/tailwind.css", { injectPosition: "first" }],
  },
  nitro: {
    plugins: ["~/server/index.ts"],
  },
});
