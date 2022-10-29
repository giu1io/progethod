export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'progethod',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        src: 'https://apis.google.com/js/api.js',
        async: true,
        defer: true
      },
      {
        src: 'https://accounts.google.com/gsi/client',
        async: true,
        defer: true
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/postcss/vue-tagsinput'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vuex-persist', ssr: false },
    { src: '~/plugins/axios', ssr: false }
  ],

  router: {
    middleware: ['updateApi']
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/date-fns'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/i18n'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.NODE_ENV === 'development' ? `${process.env.CF_PAGES_URL}/api/` : '/api/'
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      'yocto-queue'
    ],
    extend (config, { isClient, loaders: { vue } }) {
      if (isClient) {
        vue.transformAssetUrls.video = ['src', 'poster']
      }
    }
  },

  i18n: {
    locales: [
      { code: 'it', iso: 'it-IT', file: 'it.json' }
    ],
    defaultLocale: 'it',
    langDir: '~/locales/',
    vueI18n: {
      fallbackLocale: 'it'
    }
  },
  dateFns: {
    locales: [
      'it'
    ],
    defaultLocale: 'it',
    fallbackLocale: 'it',
    methods: [
      'format', 'addDays', 'startOfWeek', 'intervalToDuration'
    ]
  },
  tailwindcss: {
    config: {
      options: {
        // List your classes here, or you can even use RegExp
        safelist: [
          'bg-red-500',
          'bg-red-200',
          'text-red-500',
          'bg-yellow-500',
          'bg-yellow-200',
          'text-yellow-500'
        ]
      },
      variants: {
        extend: {
          cursor: ['disabled'],
          pointerEvents: ['disabled'],
          backgroundColor: ['disabled'],
          color: ['disabled']
        }
      }
    }
  },
  env: {
    apiBaseUrl: `${process.env.CF_PAGES_URL}/api/`,
    feUrl: `${process.env.CF_PAGES_URL}/`,
    feHost: (new URL(process.env.CF_PAGES_URL)).host,
    loginHost: process.env.LOGIN_HOST,
    instructionVideoUrl: process.env.INSTRUCTION_VIDEO_URL,
    gCalApiKey: process.env.GCAL_API_KEY,
    gCalClientId: process.env.GCAL_CLIENT_ID
  }
}
