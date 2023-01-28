import { resolve } from 'path'
// import { fileURLToPath } from 'node:url'
// import fs from 'fs'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import glsl from 'vite-plugin-glsl'
import defineNuxtConfig from '#app'

export default defineNuxtConfig({
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
    '@/assets/css/base-dark.min.css',
    '@/assets/css/base-dark-buttons.min.css',
    '@/assets/css/grid.css',
    '@/assets/css/animation.css',
    '@/assets/css/colors-and-gradients.css',
    '@/assets/css/spacing-and-sizing.css',
    '@/assets/css/dark.css',
    '@/assets/css/light.css',
    '@/assets/css/components.css',
    '@/assets/css/typography.css',
    '@/assets/css/error.css',
    '@/assets/css/global.css',
    '@/assets/css/fonts.css',
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
    reactivityTransform: true,
    inlineSSRStyles: false,
  },

  colorMode: {
    classSuffix: '',
  },
  nitro: {
    serveStatic: true,
  },

  postcss: {
    plugins: {
      tailwindcss: {

      },
      autoprefixer: {},
    },
  },
})
