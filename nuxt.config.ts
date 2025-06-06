export default defineNuxtConfig({
  // Server Side Rendering: https://nuxt.com/docs/getting-started/deployment#server-side-rendering
  // ssr: true, // Default is true in Nuxt 3. Explicitly setting for clarity.

  // TypeScript: https://nuxt.com/docs/guide/concepts/typescript
  typescript: {
    strict: true,
    // typeCheck: true, // Can enable stricter type checking during build
  },

  // App metadata: https://nuxt.com/docs/api/configuration/nuxt-config#head
  app: {
    head: {
      titleTemplate: '%s - Deployer',
      title: 'Deployer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        // 'hid' is Nuxt 2, use 'key' or just rely on 'name' for uniqueness in Nuxt 3
        { key: 'description', name: 'description', content: 'Nuxt 3 Deployer Application' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  // CSS: https://nuxt.com/docs/api/configuration/nuxt-config#css
  css: [
    '~/assets/variables.scss', // Copied from old project, for Vuetify
    '~/assets/prism.css',     // Copied from old project
  ],

  // Modules: https://nuxt.com/modules
  modules: [
    'vuetify-nuxt-module',
    '@sidebase/nuxt-auth',
    '@vite-pwa/nuxt',
  ],

  // Vuetify module configuration
  vuetify: {
    // vuetify-nuxt-module options. `styles` and `autoImport` are typically true by default or configured here.
    // Check module documentation for exact options. Assuming autoImport is default or not needed explicitly here.
    // `styles: 'sass'` might be needed if not default. The module aims to simplify this.
    // For now, let's keep it minimal and rely on module defaults.
    // moduleOptions: {
    // styles: true, // This is often default or handled by providing `vuetifyOptions.scssSettings`
    // },
    vuetifyOptions: {
      // Ensure this structure is correct for vuetify-nuxt-module
      theme: {
        themes: {
          light: {
            dark: false,
            colors: {
              primary: '#1ecbe1',
              accent: '#607d8b',
              secondary: '#E1341E',
              info: '#00bcd4',
              warning: '#ffc107',
              error: '#f44336',
              success: '#4caf50',
            }
          }
        }
      },
      // icons: {
      // defaultSet: 'mdi', // Ensure @mdi/font is installed
      // },
    }
  },

  // Nuxt Auth configuration: https://sidebase.io/nuxt-auth/configuration/nuxt-config
  auth: {
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: '/auth/login', method: 'post' },
        signOut: { path: '/auth/logout', method: 'post' },
        signUp: { path: '/auth/register', method: 'post' },
        getSession: { path: '/auth/user', method: 'get' }
      },
      pages: {
        login: '/login',
      },
      token: {
        signInResponseTokenPointer: '/token',
      },
      // IMPORTANT: Update this sessionDataType to match your actual user model/session structure
      sessionDataType: { id: 'string', email: 'string', name: 'string', role: 'string', /* add other fields like picture, etc. */ }
    },
    // globalAppMiddleware: true, // Consider enabling this if auth is required for most pages
  },

  // PWA Configuration: https://vite-pwa-org.netlify.app/frameworks/nuxt.html#configuration
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Deployer PWA',
      short_name: 'Deployer',
      description: 'Deployer Application with Nuxt 3',
      theme_color: '#1ecbe1',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    devOptions: {
      enabled: true,
      type: 'module',
    },
  },

  // Runtime Config: https://nuxt.com/docs/guide/going-further/runtime-config
  runtimeConfig: {
    // Example: authSecret: process.env.AUTH_SECRET, // For @sidebase/nuxt-auth if using advanced features or Auth.js type
    public: {
      // apiBase: '/api',
    }
  },

  // Build configuration
  build: {
    // transpile: ['vuetify'], // vuetify-nuxt-module generally handles this.
  },

  // Dev server configuration
  devServer: {
    port: process.env.NUXT_PORT ? parseInt(process.env.NUXT_PORT) : 3005, // Renamed PORT to NUXT_PORT to avoid conflict
    host: process.env.NUXT_HOST || '0.0.0.0', // Renamed HOST to NUXT_HOST
  },

  compatibilityDate: '2024-07-05',
});
