<template>
  <v-card rounded outlined>
    <v-card-title>Sign in</v-card-title>
    <v-card-text>
      <ValidationObserver v-slot="{ invalid }">
        <v-form @submit.prevent="login">
          <ValidationProvider
            v-slot="{ errors }"
            name="email"
            rules="required|email"
          >
            <v-text-field
              v-model="credentials.email"
              :error-messages="errors"
              label="Email"
              type="email"
            />
          </ValidationProvider>

          <ValidationProvider
            v-slot="{ errors }"
            name="password"
            rules="required"
          >
            <v-text-field
              v-model="credentials.password"
              :error-messages="errors"
              type="password"
              label="Password"
            />
          </ValidationProvider>
          <v-btn
            type="submit"
            :disabled="invalid"
            large
            color="primary"
            depressed
            >Sign in</v-btn
          >
          <router-link class="title" to="/password/reset"
            >Reset password</router-link
          >
        </v-form>
      </ValidationObserver>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  layout: 'auth',
  data() {
    return {
      credentials: {
        email: null,
        password: null,
      },
    }
  },

  methods: {
    async login() {
      try {
        await this.$auth.loginWith('cookie', { data: this.credentials })
      } catch (error) {
        if (error.response.status === 500) {
          throw new Error(error)
        }
        this.err = error.response.data.message
        setTimeout(() => {
          this.err = null
        }, 5000)
      }
    },
  },
}
</script>
