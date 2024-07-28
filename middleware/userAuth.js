export default defineNuxtRouteMiddleware((to, from) => {
  const accessToken = useCookie("accessToken").value;
  if (!accessToken) {
    return navigateTo("/signIn");
  }
});
