// Nuxt 3 Plugin: plugins/axios.ts
// Original content below needs to be refactored for Nuxt 3.
// See: https://nuxt.com/docs/guide/directory-structure/plugins

export default defineNuxtPlugin(nuxtApp => {
  // Access runtime config: const config = useRuntimeConfig();

  // Provide helper: nuxtApp.provide('myPlugin', () => 'Hello from plugin')

  // --- Original Plugin Content (needs refactor) ---
export default function ({ $axios, redirect, store }, inject) {
  $axios.defaults.baseURL = null
  $axios.defaults.headers.common.Accept = 'application/json'
  $axios.defaults.withCredentials = true

  // TODO enable these interceptors later
  //   $axios.onRequest(() => {
  //     store.commit('loading', true)
  //   })

  //   $axios.onResponse(() => {
  //     store.commit('loading', false)
  //   })

  //   $axios.onError(() => {
  //     store.commit('loading', false)
  //   })
}

  // --- End Original Plugin Content ---
});
