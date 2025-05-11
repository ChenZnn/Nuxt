export default defineNuxtRouteMiddleware((to) => {
  // Pages qui ne nécessitent pas d'authentification
  const publicPages = ['/login', '/register', '/'];
  const authRequired = !publicPages.includes(to.path);

  if (process.client) {
    const token = localStorage.getItem('token');
    
    // Si la page n'est pas publique et qu'il n'y a pas de token
    if (authRequired && !token) {
      return navigateTo('/login');
    }
  }
});
