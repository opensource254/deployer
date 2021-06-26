<template>
  <v-row justify="center">
    <v-col cols="12" sm="10">
      <h1>Hi {{ $auth.user.name }}</h1>
    </v-col>
    <v-col cols="12" sm="8" md="7">
      <v-tabs
        v-if="!$vuetify.breakpoint.mobile"
        grow
        center-active
        icons-and-text
      >
        <v-tab exact to="/home">Home</v-tab>
        <v-tab to="/home/deployments">Deployments</v-tab>
        <v-tab to="/home/applications">Applications</v-tab>
        <v-tab to="/home/settings">Settings</v-tab>
      </v-tabs>
      <nuxt-child />
    </v-col>
  </v-row>
</template>
