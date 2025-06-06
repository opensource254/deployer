<template>
  <v-card rounded outlined>
    <v-card-text>
      <v-form>
        <v-text-field outlined label="Email" type="email" />
        <v-text-field outlined type="password" label="Password" />
        <v-text-field outlined type="password" label="Cofirm password" />
        <v-btn large color="primary" depressed>Reset password</v-btn>
        <router-link to="/login">Sign in</router-link>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  layout: 'auth',
}
</script>
