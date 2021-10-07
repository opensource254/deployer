<template>
  <v-container>
    <v-row>
      <v-col>
        <h3>Showing Deployment: #{{ $route.params.id }}</h3>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title>
            <span class="headline">Deployment Details</span>
          </v-card-title>
          <v-card-text class="body-1">
            <v-row>
              <v-col cols="12" md="6">
                Duration: {{ deployment.duration }}
              </v-col>
              <v-col cols="12" md="6">
                Deployment name: {{ deployment.applicationName }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                Deployment Status:
                {{ deployment.successful ? 'Success' : 'Failed' }}
              </v-col>
              <v-col cols="12" md="6">
                Deployment date:
                {{ new Date(deployment.created_at).toLocaleString() }}
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!--- Deployment Logs --->
      <v-col cols="12">
        <v-card outlined>
          <v-card-title>
            <span class="headline">Deployment Logs</span>
          </v-card-title>
          <div class="code-div">
            <pre><code class="language-shell">{{ deployment.log || 'N/A' }}</code></pre>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      deployment: {},
    }
  },
  async fetch() {
    const { data } = await this.$axios.get(
      `/api/stats/deployments/${this.$route.params.id}`
    )
    this.deployment = data
  },
  methods: {},
}
</script>

<style scoped>
.code-div {
  font-family: 'Fira Code', monospace;
  font-size: 14px;
  line-height: 1.5;
  overflow: auto;
  padding: 1rem;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
