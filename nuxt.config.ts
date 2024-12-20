import Aura from '@primevue/themes/aura';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app: {
    keepalive: true,
  },
  modules: [
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module',
    '@pinia/nuxt'
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
    //   exclude: ['/register', '/login/withOtp'],
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
            preset: Aura
        }
    }
  }
})