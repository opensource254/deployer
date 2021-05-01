<template>
  <v-row class="fill-height" justify="center">
    <v-col cols="12" md="6">
      <v-card rounded outlined>
        <v-card-text>
          <v-form>
            <v-text-field label="Email" type="email" />
            <v-text-field type="password" label="Password" />
            <v-btn large color="primary" depressed>Sign in</v-btn>
            <router-link to="/password">Reset password</router-link>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
