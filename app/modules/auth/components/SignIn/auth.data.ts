import { useAlertStore } from "~/stores/alert";
import { useMainStore } from "~/stores/main";

export async function loginStaff(email: string, password: string) {
  const { $authRep } = useNuxtApp();
  const mainStore = useMainStore();
  const alertStore = useAlertStore();
  const router = useRouter();

  const authTokenCookie = useCookie("authToken", {
    maxAge: 60 * 60 * 24, // Устанавливаем срок жизни куки (24 часа)
  });

  try {
    const body = {
      email: email,
      password: password,
    };
    const res = await $authRep.loginStaff(body);
    authTokenCookie.value = res.data.token;
    mainStore.staff = res.data.staff;
    router.push("/");
  } catch (error) {
    console.error("Не удалось получить /auth/login ", error);
    alertStore.dangerAlert = {
      active: true,
      text: "Ошибка авторизации, повторите попытку",
    };
    setTimeout(() => {
      alertStore.dangerAlert = {
        active: false,
        text: "",
      };
    }, 4000);
  }
}
