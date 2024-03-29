// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: process.env.VITE_BASE_URL,
    },
  },
  ssr: false,
  devServer: {
    port: 4000,
  },
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'dayjs-nuxt',
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          Anuphan: [400, 700],
        },
      },
    ],
  ],
  css: ['vuetify/lib/styles/main.sass', '~/assets/global.css'],
  plugins: [{ src: '~/plugins/aos', mode: 'client' }],
  build: {
    transpile: ['vuetify'],
  },
  app: {
    head: {
      titleTemplate: '%s | ASAP',
      link: [{ rel: 'icon', type: 'image/png', href: '/ssa3/favicon.ico' }],
    },
    baseURL: '/ssa3/',
  },
  nitro: {
    prerender: {
      autoSubfolderIndex: true,
    },
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config',
    exposeConfig: false,
    exposeLevel: 2,
    config: {},
    injectPosition: 'first',
    viewer: true,
  },
  dayjs: {
    locales: ['th'],
    defaultLocale: 'th',
    defaultTimezone: 'Asia/Bangkok',
    plugins: ['relativeTime', 'utc', 'timezone'],
  },
})
