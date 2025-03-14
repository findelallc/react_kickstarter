import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
    // Load environment variables based on the mode (development/production)
    const env = loadEnv(mode, process.cwd())

    return {
        plugins: [react()],
        server: {
            open: true,
        },
        build: {
            rollupOptions: {
                input: {
                    main: './index.html',
                },
                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            // Bundle all node_modules dependencies into a separate chunk
                            return id
                                .toString()
                                .split('node_modules/')[1]
                                .split('/')[0]
                                .toString()
                        }
                    },
                },
            },
            chunkSizeWarningLimit: 1000,
        },
        resolve: {
            alias: {
                '@': '/src',
            },
        },
        define: {
            // Make environment variables available in app
            API_URL: JSON.stringify(env.VITE_API_URL),
        },
    }
})