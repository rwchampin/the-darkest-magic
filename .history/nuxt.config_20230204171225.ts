import { resolve } from 'path'
// import { fileURLToPath } from 'node:url'
import fs from 'fs'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import glsl from 'vite-plugin-glsl'

export default defineNuxtConfig({
  debug: true,
  ssr: false,
  target: 'static',
  head: {
    title: 'Ryan The Developer',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Ryan The Developer' },
      { hid: 'og:title', property: 'og:title', content: 'Ryan The Developer' },
      { hid: 'og:description', property: 'og:description', content: 'Ryan The Developer' },
      { hid: 'og:image', property: 'og:image', content: 'https://ryanthedev.com/public-assets/og-image.png' },
      { hid: 'og:url', property: 'og:url', content: 'https://ryanthedev.com' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:site', name: 'twitter:site', content: '@ryanthedev' },
      { hid: 'twitter:creator', name: 'twitter:creator', content: '@ryanthedev' },
      { hid: 'twitter:title', name: 'twitter:title', content: 'Ryan The Developer' },
      { hid: 'twitter:description', name: 'twitter:description', content: 'Ryan The Developer' },
      { hid: 'twitter:image', name: 'twitter:image', content: 'https://ryanthedev.com/public-assets/og-image.png' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap' },
    ],
  },

  devServer: {
    https: {
      key: './ssl/localhost-key.pem',
      cert: './ssl/localhost.pem',
    },
  },
  alias: {
    '@mesh': resolve(__dirname, 'mesh'),
    '@core': resolve(__dirname, 'core'),
    '@shaders': resolve(__dirname, 'shaders'),
    '@materials': resolve(__dirname, 'materials'),
    '@geometry': resolve(__dirname, 'geometry'),
    '@particles': resolve(__dirname, 'particles'),
    '@passes': resolve(__dirname, 'passes'),
    '@store': resolve(__dirname, 'store'),
    '@utils': resolve(__dirname, 'utils'),
    '@composables': resolve(__dirname, 'composables'),

    '~mesh': resolve(__dirname, 'mesh'),
    '~core': resolve(__dirname, 'core'),
    '~shaders': resolve(__dirname, 'shaders'),
    '~materials': resolve(__dirname, 'materials'),
    '~geometry': resolve(__dirname, 'geometry'),
    '~particles': resolve(__dirname, 'particles'),
    '~passes': resolve(__dirname, 'passes'),
    '~store': resolve(__dirname, 'store'),
    '~utils': resolve(__dirname, 'utils'),
    '~composables': resolve(__dirname, 'composables'),
  },
  modules: [
    '@kevinmarrec/nuxt-pwa',
    '@vueuse/nuxt',
    // '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
  ],
  pwa: {
    workbox: {
      enabled: true,
    },
    icon: {
      source: 'public/public-assets/pwa-icon.png',
    },
    meta: {
      name: 'Ryan The Developer',
      description: 'Ryan The Developer',
      theme_color: '#000000',
      ogHost: 'https://ryanthedeveloper.com',
      ogImage: 'public/public-assets/pwa-icon.png',
      twitterCard: 'summary_large_image',
      twitterSite: '@ryanthedeveloper',
      twitterCreator: '@ryanthedeveloper',
    },
    manifest: {
      name: 'Ryan The Developer',
      short_name: 'Ryan The Developer',
      description: 'Ryan The Developer',
      lang: 'en',
      theme_color: '#eeeeee',
      background_color: '#000000',
      display: 'standalone',
      orientation: 'portrait',
      start_url: '/',
      scope: '/',
    },

  },

  css: [
  //   '@/assets/css/base-dark.min.css',
  //   '@/assets/css/base-dark-buttons.min.css',
  //   '@/assets/css/grid.css',
  //   '@/assets/css/animation.css',
  //   '@/assets/css/colors-and-gradients.css',
  //   '@/assets/css/spacing-and-sizing.css',
  //   '@/assets/css/dark.css',
  //   '@/assets/css/light.css',
  //   '@/assets/css/components.css',
  //   '@/assets/css/typography.css',
  //   '@/assets/css/error.css',
    '@/assets/css/global.css',
  //   '@/assets/css/fonts.css',
  ],
  vite: {
    plugins: [
      glsl({
        include: [ // Glob pattern, or array of glob patterns to import
          '**/*.glsl', '**/*.wgsl',
          '**/*.vert', '**/*.frag',
          '**/*.vs', '**/*.fs',
        ],
        exclude: undefined, // Glob pattern, or array of glob patterns to ignore
        warnDuplicatedImports: true, // Warn if the same chunk was imported multiple times
        defaultExtension: 'glsl', // Shader suffix when no extension is specified
        compress: false, // Compress output shader code
        watch: true, // Recompile shader on change
        root: '/', // Directory for root imports
      }),
      Components({
        resolvers: [NaiveUiResolver()], // Automatically register all components in the `components` directory
      }),
    ],
    ssr: {
      noExternal: ['naive-ui', '@css-render/vue3-ssr'],
    },
    // build: {
    //   rollupOptions: {
    //     external: ['chalk'],
    //   },
    // },
  },
  experimental: {
    reactivityTransform: false,
    inlineSSRStyles: false,
  },

  colorMode: {
    classSuffix: '',
    preference: 'light'
  },
  // nitro: {
  //   serveStatic: true,
  // },

  postcss: {
    plugins: {
      tailwindcss: {

      },
      autoprefixer: {},
    },
  },
})
