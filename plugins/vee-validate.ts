// Nuxt 3 Plugin: plugins/vee-validate.ts
// Original content below needs to be refactored for Nuxt 3.
// See: https://nuxt.com/docs/guide/directory-structure/plugins

export default defineNuxtPlugin(nuxtApp => {
  // Access runtime config: const config = useRuntimeConfig();

  // Provide helper: nuxtApp.provide('myPlugin', () => 'Hello from plugin')

  // --- Original Plugin Content (needs refactor) ---
import Vue from 'vue'
import { required, email } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'

extend('required', {
  ...required,
  message: 'The {_field_} is required',
})

extend('email', {
  ...email,
  message: 'Please input a valid email',
})

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

  // --- End Original Plugin Content ---
});
