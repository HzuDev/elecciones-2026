// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

export default defineConfig({
  // Asegúrate de que estas dos líneas estén así:
  site: 'https://hzudev.github.io/elecciones-2026/',
  base: '/elecciones-2026',
  trailingSlash: 'always',

  vite: {
    plugins: [tailwindcss()],
    define: {
      'import.meta.env.VITE_APPWRITE_ENDPOINT': JSON.stringify(process.env.VITE_APPWRITE_ENDPOINT),
      'import.meta.env.VITE_APPWRITE_PROJECT_ID': JSON.stringify(process.env.VITE_APPWRITE_PROJECT_ID),
      'import.meta.env.VITE_APPWRITE_DATABASE_ID': JSON.stringify(process.env.VITE_APPWRITE_DATABASE_ID),
      'import.meta.env.VITE_APPWRITE_BUCKET_ID': JSON.stringify(process.env.VITE_APPWRITE_BUCKET_ID),
    },
  },
  integrations: [react()],
});