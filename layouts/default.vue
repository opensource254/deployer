<template>
  <v-app>
    <v-app-bar flat app hide-on-scroll>
      <v-toolbar-title>
        <nuxt-link to="/">
          <v-img height="70" width="70" src="/icon.png" />
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-menu
          v-if="$auth.loggedIn"
          bottom
          nudge-top
          min-width="200px"
          rounded
          offset-y
        >
          <template #activator="{ on }">
            <v-btn data-profile-menu icon x-large v-on="on">
              <v-avatar color="brown" size="48">
                <span class="white--text headline">JD</span>
              </v-avatar>
            </v-btn>
          </template>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar color="brown">
                <span class="white--text headline">JD</span>
              </v-avatar>
              <h3>{{ $auth.user.name }}</h3>
              <p class="caption mt-1">
                {{ $auth.user.email }}
              </p>
              <v-divider class="my-3" />
              <v-btn to="/" depressed rounded text> Home </v-btn>
              <v-divider class="my-3" />
              <v-btn to="/home" depressed rounded text> My account </v-btn>
              <v-divider class="my-3" />
              <v-btn
                color="error"
                depressed
                rounded
                text
                @click="$auth.logout()"
              >
                Logout
              </v-btn>
            </div>
          </v-list-item-content>
        </v-menu>
        <template v-else>
          <v-btn text link to="/login"> Login </v-btn>
        </template>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
    <v-bottom-navigation
      v-if="$vuetify.breakpoint.mobile"
      fixed
      shift
      grow
      color="primary"
      app
    >
      <v-btn exact to="/home">
        <span>Home</span>
        <v-icon>mdi-home-outline</v-icon>
      </v-btn>
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
