<template>
  <v-container>
    <v-col cols="12">
      <h1>Hi {{ $auth.user.name }}</h1>
    </v-col>
    <v-col cols="12" md="8">
      <v-tabs grow center-active>
        <v-tab to="/home">Home</v-tab>
        <v-tab to="/home/deployments">Deployments</v-tab>
        <v-tab to="/home/applications">Applications</v-tab>
        <v-tab to="/home/settings">Settings</v-tab>
      </v-tabs>
      <nuxt-child />
    </v-col>
  </v-container>
</template>
