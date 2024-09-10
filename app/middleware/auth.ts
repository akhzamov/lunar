import { defineNuxtRouteMiddleware, navigateTo } from '#app'

export default defineNuxtRouteMiddleware((to, from) => {
    const authCookie = useCookie('auth');
    const isAuthenticated = authCookie.value && authCookie.value.length > 0;  // Проверка на наличие токена
    console.log('Is Authenticated:', isAuthenticated);

    if (!isAuthenticated && !to.path.startsWith(`/sign-in`)) {
        return navigateTo(`/sign-in`);
    }

    if (isAuthenticated && to.path.startsWith(`/sign-in`)) {
        return navigateTo(`/profile`);
    }
})