export default {
  head: {
    title: 'nuxt-blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  loading: {
    color: '#409EFF'
  },

  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/theme/index.scss'
  ],

  plugins: [
    '@/plugins/globals'
  ],

  components: true,

  buildModules: [
  ],

  modules: [
    '@nuxtjs/axios'
  ],

  serverMiddleware: [
    '~/server/index.js'
  ],

  build: {
    transpile: [/^element-ui/],
  }
}
