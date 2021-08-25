<template>
  <div>
    <h1 v-if="deployments.length === 0">
      There are no deployments at this time.
    </h1>

    <div v-else>
      <v-list-item v-for="(d, i) in deployments" :key="i">
        <v-list-item-content>
          <v-list-item-title>{{ d.applicationName }}</v-list-item-title>
          <!-- <v-list-item-sub-title>{{ d.environment }}</v-list-item-sub-title> TODO: Include environments -->
          <v-list-item-subtitle>
            <v-icon
              type="check"
              :color="d.status === 'running' ? 'positive' : 'negative'"
            ></v-icon>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      deployments: [],
    }
  },
  async fetch() {
    const { data } = await this.$axios.get('/api/stats/deployments')
    this.deployments = data
  },
  head() {
    return {
      title: 'Deployments 🚀',
    }
  },
}
</script>
