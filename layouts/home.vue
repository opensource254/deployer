<template>
  <v-app>
    <v-app-bar flat app hide-on-scroll>
      <v-toolbar-title>
        <v-btn icon to="/home">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
    <v-bottom-navigation v-if="$vuetify.breakpoint.mobile" fixed shift grow>
      <v-btn to="/home/deployments">
        <span>Deployments</span>
        <v-icon>mdi-rocket-launch-outline</v-icon>
      </v-btn>
      <v-btn to="/home/applications">
        <span>Applications</span>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn to="/home/settings">
        <span>Settings</span>
        <v-icon>mdi-cog-outline</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>
