<template>
  <v-card rounded outlined>
    <v-card-title>Sign in</v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field label="Email" type="email" />
        <v-text-field type="password" label="Password" />
        <v-btn large color="primary" depressed>Sign in</v-btn>
        <router-link class="title" to="/password/reset"
          >Reset password</router-link
        >
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  layout: 'auth',
}
</script>
