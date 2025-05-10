import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  // Configuración crítica para GitHub Pages:
  base: process.env.DEPLOY_BASE_URL || '/',
  
  plugins: [
    react(),
    tailwindcss(),
  ],

  // Configuración de build optimizada para SPAs:
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
      },
    },
  },

  // Opciones adicionales para desarrollo y rutas SPA:
  server: {
    open: true,
    port: 5173,
  },
  preview: {
    port: 4173,
  },
  esbuild: {
    jsxInject: `import React from 'react'`, // Para evitar importar React en cada archivo
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  }
});