import { defineNuxtRouteMiddleware, navigateTo } from "#app";

export default defineNuxtRouteMiddleware((to, from) => {
	const authCookie = useCookie("auth");
	const isAuthenticated =
		authCookie.value && authCookie.value.length > 0;

	if (!isAuthenticated && !to.path.startsWith(`/sign-in`)) {
		return navigateTo(`/sign-in`);
	}

	if (isAuthenticated && to.path.startsWith(`/sign-in`)) {
		return navigateTo(`/profile`);
	}
});
