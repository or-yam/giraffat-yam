import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        theme_color: '#8936FF',
        background_color: '#2EC6FE',
        icons: [
          { purpose: 'maskable', sizes: '512x512', src: 'icon512_maskable.png', type: 'image/png' },
          { purpose: 'any', sizes: '512x512', src: 'icon512_rounded.png', type: 'image/png' }
        ],
        orientation: 'landscape',
        display: 'standalone',
        dir: 'ltr',
        lang: 'he-IL',
        name: "ג'ירפת-ים",
        short_name: "ג'ירפת-ים",
        start_url: 'https://giraffat-yam.vercel.app/',
        scope: 'https://giraffat-yam.vercel.app/',
        id: 'https://giraffat-yam.vercel.app/'
      }
    })
  ],
  build: { minify: false }
});
