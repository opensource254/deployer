<template>
  <v-card rounded outlined>
    <v-card-title>Reset password</v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field outlined label="Email" type="email" />
        <v-btn large color="primary" depressed>Reset password</v-btn>
        <router-link class="title" to="/login">Sign in</router-link>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  auth: 'guest',
  layout: 'auth',
}
</script>
