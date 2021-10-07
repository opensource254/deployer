<template>
  <div>
    <h1 v-if="deployments.length === 0">
      There are no deployments at this time.
    </h1>

    <div v-else>
      <v-card v-for="(d, i) in deployments" :key="i" outlined class="ma-2">
        <v-card-title>
          <v-btn icon :to="`/home/deployments/${d.id}`">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
          <span class="headline">{{ d.applicationName }}</span>
        </v-card-title>
        <v-card-text>
          <p><strong>Deployed at:</strong> {{ new Date(d.created_at) }}</p>
        </v-card-text>
      </v-card>
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
