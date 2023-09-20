/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['src/setupTest.ts'],
  },
  build: {
    sourcemap: true,
  },
  plugins: [
    react(),
    VitePWA({
      // injectRegister: 'auto',
      // workbox: {
      //   importScripts: ['./mockServiceWorker.js'],
      //   globIgnores: ['**/node_modules/**/*', '**/mockServiceWorker.js'],
      //   globPatterns: ['**/*'],
      //   clientsClaim: true,
      //   skipWaiting: true,
      // },
      // devOptions: {
      //   enabled: true
      // },
      registerType: "autoUpdate", // prompt
      includeAssets: ['**/*'],
      manifest: {
        theme_color: '#f69435',
        background_color: '#f69435',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        short_name: 'Store',
        description: 'testing Store Spa',
        name: 'Store Spa',
        icons: [
          {
            src: '/favicon.ico',
            type: 'image/x-icon',
            sizes: '64x64',
          },
          {
            src: '/logo192.png',
            type: 'image/png',
            sizes: '192x192',
          },
          {
            src: '/logo512.png',
            type: 'image/png',
            sizes: '512x512',
          },
        ],
      },
    }),
  ],
});
