import Aura from '@primevue/themes/aura';
import Material from '@primevue/themes/material';
import Lara from '@primevue/themes/lara';
import Nora from '@primevue/themes/nora';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app: {
    keepalive: true,
  },
  routeRules:{
    "/login": {
      redirect: "/?login=true"
    },
    "/register": {
      redirect: "/?register=true"
    }
  },
  modules: [
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module',
    '@pinia/nuxt',
    '@nuxtjs/device'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern', // or "modern"
          additionalData: '@use "~/assets/styles/_variables.scss" as *;'
        }
      }
    }
  },
  css: [
    "./assets/styles/styles.scss"
  ],
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirect: false,
    // redirectOptions: {
    //   login: '/login',
    //   callback: '/confirm',
    //   include: undefined,
    //   exclude: ['/register', '/login'],
    //   cookieRedirect: false,
    // },
    cookieOptions: {
      maxAge: 60 * 60 * 24 * 10,
      sameSite: 'lax',
      secure: true
    },
    clientOptions: {
      auth: {
        flowType: 'pkce',
        detectSessionInUrl: true,
        persistSession: true,
        autoRefreshToken: true
      },
    }    
  },
  primevue: {
    options: {
        theme: {
            preset: Aura,
            options: {
              prefix: 'p',
              darkModeSelector: '.my-app-dark',
              cssLayer: false
          }
        }
    }
  }
})