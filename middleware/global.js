export default defineNuxtRouteMiddleware((to, from) => {
  if (!to.matched.length) {
    return navigateTo('/404', { statusCode: 404, statusMessage: 'Page Not Found' });
  }
});
