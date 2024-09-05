// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4
  },


  extends: [],

  app: {
    head: {
      // link: [
      //   { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }
      // ],
      bodyAttrs: {
        id: 'body'
      }
    },
  },

  modules: ['@nuxt/ui', '@nuxtjs/google-fonts', '@nuxtjs/i18n', '@pinia/nuxt',],

  pinia: {
    storesDirs: ['~/stores/**', '~/layers/**/stores/**'],
  },

  css: ['~/assets/css/tailwind.css'],

  i18n: {
    strategy: 'prefix',
    locales: [
      // { code: "en", language: 'en-US', name: "English", file: "en.ts", dir: "ltr" }, // Английский
      { code: "ru", language: 'ru-RU', name: "Русский", file: "ru.ts", dir: "ltr" }, // Русский
    ],
    defaultLocale: "en",
    detectBrowserLanguage: false,
    langDir: "locales",
    vueI18n: "./i18n.config.ts"
  },

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
    storageKey: 'color-mode',
  },

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: './tailwind.config.js',
    exposeConfig: true,
    viewer: true,
  },

  googleFonts: {
    families: {
      Inter: {
        wght: [200, 300, 400, 500, 600, 700]
      }
    }
  },

  routeRules: {
    '/': { prerender: true },
    '/:pathMatch(.*)*': { prerender: true },
  },

  nitro: {
    prerender: {
      routes: ['/index.html', '/404.html'],
    },
  },
})