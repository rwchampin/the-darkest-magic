import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import glsl from 'vite-plugin-glsl'
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
  ],
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
      glsl(),
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
