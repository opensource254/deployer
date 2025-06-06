<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-card rounded outlined>
    <!--Alerts-->
    <v-alert
      v-if="messages.error"
      v-model="messages.error"
      type="error"
      dismissible
    >
      {{ messages.error }}
    </v-alert>
    <v-alert
      v-if="messages.success"
      v-model="messages.success"
      type="success"
      dismissible
    >
      {{ messages.success }}
    </v-alert>
    <!--End Alerts-->
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
              placeholder="Email"
              type="email"
              rounded
              filled
            />
          </ValidationProvider>

          <ValidationProvider
            v-slot="{ errors }"
            name="password"
            rules="required"
          >
            <v-text-field
              v-model="credentials.password"
              rounded
              filled
              :error-messages="errors"
              :type="password.visible ? 'text' : 'password'"
              placeholder="Password"
              :append-icon="
                password.visible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
              "
              @click:append="password.visible = !password.visible"
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
      password: {
        visible: false,
      },
      credentials: {
        email: null,
        password: null,
      },
      messages: {
        success: null,
        error: null,
      },
    }
  },

  methods: {
    async login() {
      try {
        await this.$auth.loginWith('cookie', { data: this.credentials })
      } catch (error) {
        switch (error.response.status) {
          case 500:
            this.messages.error = 'Internal server error.'
            break
          case 422:
            this.messages.error = 'Authentication failed 😢'
            break
          default:
            this.messages.error = error.response.data
            break
        }
      }
    },
  },
}
</script>
