import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';  // ganti ini

export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  vite: {
    plugins: [tailwindcss()],  // pindah ke vite.plugins
  },
  server: {
    host: true,
    port: Number(process.env.PORT ?? 3000)
  }
});