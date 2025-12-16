export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss'
  ],

  compatibilityDate: '2024-11-01',

  devtools: { enabled: true },

  pages: true,

  future: {
    compatibilityVersion: 4,
  },

  runtimeConfig: {
    // Public (available on both client and server)
    public: {
      supabaseUrl: process.env.SUPABASE_URL || '',
      supabaseKey: process.env.SUPABASE_ANON_KEY || '',
      xenditsecret: process.env.test
    }
  },
})
