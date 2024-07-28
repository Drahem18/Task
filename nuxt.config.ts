// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primevue/themes/aura";
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxt/icon", "@nuxtjs/apollo", "@nuxt/image"],

  css: ["@/assets/scss/main.scss"],
  build: {
    transpile: ["primevue"],
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/scss/variables.scss";`,
          implementation: require("sass"),
        },
      },
    },
  },

  apollo: {
    clients: {
      default: {
        httpEndpoint: "https://api.escuelajs.co/graphql",
      },
    },
  },
});
