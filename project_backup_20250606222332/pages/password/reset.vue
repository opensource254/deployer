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

    <!--Form-->
    <v-card-title>Reset password</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="resetPass">
        <v-text-field
          v-model="form.email"
          outlined
          label="Email"
          type="email"
        />
        <v-btn type="submit" large color="primary" depressed
          >Reset password</v-btn
        >
        <router-link class="title" to="/login">Sign in</router-link>
      </v-form>
    </v-card-text>
    <!--End Form-->
  </v-card>
</template>
<script>
export default {
  auth: 'guest',
  layout: 'auth',
  data() {
    return {
      form: {
        email: '',
      },
      messages: {
        success: null,
        error: null,
      },
    }
  },
  methods: {
    async resetPass() {
      try {
        await this.$axios.post('/api/password/reset', this.form)
        this.messages.success = 'Check your email for a password reset link.'
      } catch (error) {
        switch (error.response.status) {
          case 500:
            this.messages.error = 'Internal server error.'
            break
          case 422:
            this.messages.error = 'We could not find a user with that email'
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
