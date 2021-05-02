import Vue from 'vue'
import { required, email } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'

extend('required', {
  ...required,
  message: 'The {field} is required',
})

extend('email', {
  ...email,
  message: 'Please input a valid email',
})

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
