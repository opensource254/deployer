<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-dialog v-model="createEventdialog" width="300">
          <template #activator="{ on, attrs }">
            <v-btn color="primary" large v-bind="attrs" depressed v-on="on"
              >Create app</v-btn
            >
          </template>

          <v-card outlined>
            <v-card-title>Add a new application</v-card-title>
            <v-card-text>
              <ValidationObserver ref="validationObserver" v-slot="{ invalid }">
                <v-form @submit.prevent="createApplication">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="name"
                    rules="required"
                  >
                    <v-text-field
                      v-model="newApp.name"
                      :error-messages="errors"
                      placeholder="deployer"
                      label="Name"
                    />
                  </ValidationProvider>

                  <ValidationProvider
                    v-slot="{ errors }"
                    name="full name"
                    rules="required"
                  >
                    <v-text-field
                      v-model="newApp.full_name"
                      :error-messages="errors"
                      placeholder="opensource254/deployer"
                      label="Full name"
                    />
                  </ValidationProvider>

                  <ValidationProvider
                    v-slot="{ errors }"
                    name="command"
                    rules="required"
                  >
                    <v-textarea
                      v-model="newApp.command"
                      :error-messages="errors"
                      auto-grow
                      label="Deployment command"
                      placeholder="ls -lr"
                    />
                  </ValidationProvider>
                  <v-btn
                    type="submit"
                    :disabled="invalid"
                    depressed
                    color="primary"
                    rounded
                    >Add</v-btn
                  >
                </v-form>
              </ValidationObserver>
            </v-card-text>
          </v-card>
        </v-dialog>
        <h1>Applications page</h1>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-card
          v-for="(app, index) in applications"
          :key="index"
          class="my-3"
          outlined
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                Application name: {{ app.name || 'N/A' }}
              </v-list-item-title>
              <v-list-item-subtitle>
                Full name: {{ app.full_name || 'N/A' }}
              </v-list-item-subtitle>
              <div class="code-div">
                <pre><code class="language-bash">{{ app.command || 'N/A' }}</code></pre>
              </div>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon>
                <v-icon>mdi-pencil-outline</v-icon>
              </v-btn>
              <v-btn icon color="error">
                <v-icon>mdi-delete-outline</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      createEventdialog: false,
      applications: [],
      newApp: {
        name: null,
        full_name: null,
        command: null,
      },
    }
  },
  async fetch() {
    try {
      const { data } = await this.$axios.get('/api/applications')
      this.applications = data
    } catch (error) {
      throw new Error(error)
    }
  },
  head() {
    return {
      title: 'Applications 🧑🏽‍💻',
    }
  },
  methods: {
    async createApplication() {
      try {
        await this.$axios.post('/api/applications', this.newApp)
        this.createEventdialog = false
      } catch (error) {
        if (error.response.status === 422) {
          return this.$refs.validationObserver.setErrors(
            error.response.data.errors
          )
        }
        throw new Error(error)
      }
    },
  },
}
</script>
<style scoped>
.code-div {
  overflow: scroll !important;
  max-height: 100px;
}
</style>
