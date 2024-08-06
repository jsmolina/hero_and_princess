import { defineConfig } from 'vite';


export default defineConfig({
    base: './',
    plugins: [
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    phaser: ['phaser']
                }
            }
        },
    },
    server: {
        port: 8080
    }
});
