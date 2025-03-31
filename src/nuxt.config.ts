// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            charset: 'utf-8',
            viewport: "width=device-width,initial-scale=1.0",
            title: "Cinema Corona",
            link: [
                {rel: "icon", type: "image/png", href: "/favicon.png"}
            ],
        },
    },
    modules: ["@nuxtjs/tailwindcss"],
    css: ["@/assets/css/main.css"],
    components: {
        dirs: [
            '~/components',
            '~/components/modal-content',
            '~/components/forms',
            '~/components/admin',
        ]
    },
    runtimeConfig: {
        public: {
            apiURL: process.env.API_URL || "http://localhost:8000/api"
        }
    }
})
