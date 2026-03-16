// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/theme.css'],
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  tailwindcss: {
    config: {
      darkMode: 'class',
    }
  },
  app: {
    head: {
      link: [
        { 
          rel: 'stylesheet', 
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css' 
        }
      ]
    }
  },
  runtimeConfig: {
    mailHost: '',
    mailPort: '',
    mailUser: '',
    mailPass: '',
    public: {
      appName: '',

      googleVerification: '',
      googleSiteVerification: '',
    }
  }
})

