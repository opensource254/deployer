<template>
  <v-row>
    <v-col cols="12" md="4">
      <v-card outlined class="my-5">
        <v-sheet
          elevation="2"
          class="stats-sheet display-3"
          color="primary"
          height="70"
        >
          {{ stats.applicationCount }}
        </v-sheet>
        <v-card-text class="text-center title">Applications</v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" md="4">
      <v-card outlined class="my-5">
        <v-sheet
          elevation="2"
          class="stats-sheet display-3"
          color="success"
          height="70"
        >
          {{ stats.totalDeployments }}
        </v-sheet>
        <v-card-text class="text-center title">Deployments</v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" md="4">
      <v-card outlined class="my-5">
        <v-sheet
          elevation="2"
          class="stats-sheet display-3"
          color="error"
          height="70"
        >
          {{ stats.failedDeployments }}
        </v-sheet>
        <v-card-text class="text-center title">Failed deployments</v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      stats: {},
    }
  },
  async fetch() {
    const { data } = await this.$axios.get('/api/stats')
    this.stats = data
  },
}
</script>
<style scoped>
.stats-sheet {
  margin-top: -15px;
  margin-left: 7px;
  margin-right: 7pt;
  border-radius: 5px !important;
  text-align: center;
  color: white;
  padding: 4px;
}
</style>
