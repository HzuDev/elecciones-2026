// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  // 1. Agregamos la URL de tu sitio y el subdirectorio (nombre del repo)
  site: 'https://hzudev.github.io',
  base: '/elecciones-2026pnpm', 

  vite: {
    plugins: [tailwindcss()],
    define: {
      // Nota: Astro ya maneja variables .env de forma nativa si empiezan con PUBLIC_
      // Pero si prefieres mantener este bloque, asegúrate de que existan en GitHub Secrets
      'import.meta.env.VITE_APPWRITE_ENDPOINT': JSON.stringify(process.env.VITE_APPWRITE_ENDPOINT),
      'import.meta.env.VITE_APPWRITE_PROJECT_ID': JSON.stringify(process.env.VITE_APPWRITE_PROJECT_ID),
      'import.meta.env.VITE_APPWRITE_DATABASE_ID': JSON.stringify(process.env.VITE_APPWRITE_DATABASE_ID),
      'import.meta.env.VITE_APPWRITE_BUCKET_ID': JSON.stringify(process.env.VITE_APPWRITE_BUCKET_ID),
    },
  },

  integrations: [react()],
});