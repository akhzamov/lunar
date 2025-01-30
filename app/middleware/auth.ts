import { defineNuxtRouteMiddleware, navigateTo } from "#app";
import { useMainStore } from "~/stores/main";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $authRep } = useNuxtApp();
  const mainStore = useMainStore();

  const COOKIE_KEY = "lastAuthCheck"; // Ключ для хранения времени проверки
  const CACHE_DURATION = 60 * 60 * 1000; // 1 час в миллисекундах

  // Получаем куку с временем последней проверки
  const lastCheckCookie = useCookie(COOKIE_KEY);
  const lastCheck = Number(lastCheckCookie.value); // Читаем значение из куки
  const now = Date.now();

  // Проверяем, прошло ли время кеша
  if (lastCheck && now - lastCheck < CACHE_DURATION) {
    console.log("Authorization check skipped (cached).");
    return;
  }

  try {
    // Выполняем запрос для проверки авторизации
    const res = await $authRep.currentStaff();
    mainStore.staff = res.data.staff;

    // Устанавливаем новое время проверки в куки
    lastCheckCookie.value = String(now);
  } catch (error) {
    console.error("Authorization failed:", error);
    // Перенаправляем на страницу входа
    return navigateTo("/sign-in");
  }
});
