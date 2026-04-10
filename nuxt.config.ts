// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    runtimeConfig: {
        public: {
            apiBase: '',  // overridden by NUXT_PUBLIC_API_BASE
        },
    },
    devtools: {enabled: true},
    css: [
        '~/assets/css/reset.css',
        '~/assets/css/variables.css',
    ],
    fonts: {
        families: [
            {name: 'Ubuntu', provider: 'bunny'},
        ]
    },
    modules: [
        '@nuxt/eslint',
        '@nuxt/fonts',
        '@nuxt/icon',
        '@nuxt/image',
        '@nuxt/test-utils'
    ]
})