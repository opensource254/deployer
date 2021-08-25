<template>
  <v-app dark class="full-page">
    <div v-if="error.statusCode === 404">
      <v-img contain height="400" src="/404.svg" />
    </div>
    <div v-else>
      <v-img src="/500.svg" />
    </div>
    <NuxtLink to="/home"> Home page </NuxtLink>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
.full-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
