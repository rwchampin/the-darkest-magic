import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import glsl from 'vite-plugin-glsl'
export default defineNuxtConfig({
  modules: [
    '@kevinmarrec/nuxt-pwa',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
  ],
  pwa: {
    workbox: {
      enabled: false,
    },
  },
  css: [
    '@unocss/reset/tailwind.css',
    '~/assets/css/base-dark.min.css',
    '~/assets/css/base-dark-buttons.min.css',
    '~/assets/css/grid.css',
    // "~/assets/css/animation.css",
    '~/assets/css/colors-and-gradients.css',
    '~/assets/css/spacing-and-sizing.css',
    '~/assets/css/dark.css',
    '~/assets/css/light.css',
    '~/assets/css/components.css',
    '~/assets/css/typography.css',

    '~/assets/css/global.css',
    '~/assets/css/fonts.css',
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
    build: {
      rollupOptions: {
        external: ['chalk'],
      },
    },
  },
  experimental: {
    reactivityTransform: true,
    inlineSSRStyles: false,
  },

  colorMode: {
    classSuffix: '',
  },
})
