import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { templateCompilerOptions } from '@tresjs/core';
import { fileURLToPath, URL } from 'node:url';
export default defineConfig({
    plugins: [
        vue({
            ...templateCompilerOptions,
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    build: {
        sourcemap: true,
    },
    css: {
        devSourcemap: true,
    },
});
