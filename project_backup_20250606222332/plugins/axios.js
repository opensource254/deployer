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
