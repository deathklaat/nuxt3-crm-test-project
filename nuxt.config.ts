export default defineNuxtConfig({
    devtools: { enabled: false },
    modules: [
        '@nuxt/ui',
        '@nuxt/image',
        'shadcn-nuxt',
        [
            '@nuxtjs/google-fonts',
            {
                families: {
                    Lato: {
                        wght: [300, 400, 700],
                        ital: [300],
                    },
                },
            },
        ],
        'nuxt-icon',
        '@pinia/nuxt',
        [
            '@vee-validate/nuxt',
            {
                autoImports: true,
            },
        ],
    ],
    shadcn: {
        prefix: 'Ui',
        componentDir: './components/ui',
    },
    pinia: {
        storesDirs: ['./store/**'],
    },
    runtimeConfig: {
        public: {
            APP_WRITE_ID: process.env.APP_WRITE_ID,
            STORAGE_ID: process.env.STORAGE_ID,
            DB_ID: process.env.DB_ID,
            COLLECTION_DEALS: process.env.COLLECTION_DEALS,
            COLLECTION_CUSTOMERS: process.env.COLLECTION_CUSTOMERS,
            COLLECTION_COMMENTS: process.env.COLLECTION_COMMENTS,
        }
    },
})
