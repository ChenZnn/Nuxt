import type { NuxtPage } from 'nuxt/schema';

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  pages: true,
  compatibilityDate: '2025-02-06',
  hooks: {
    'pages:extend'(pages) {
      // Fonction récursive pour appliquer le middleware
      function setMiddleware(pages: NuxtPage[]) {
        for (const page of pages) {
          // Applique le middleware à toutes les pages
          page.meta ||= {}; // Assure-toi que `meta` existe
          page.meta.middleware = ['auth']; // Applique le middleware "auth" à chaque page

          // Si la page a des enfants, applique aussi le middleware sur eux
          if (page.children) {
            setMiddleware(page.children);
          }
        }
      }

      // Lance la fonction de définition du middleware
      setMiddleware(pages);
    }
  },
  devtools: { enabled: true }
});