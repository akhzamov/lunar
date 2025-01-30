import { useLangSettingsStore } from "~/stores/langSettings";
import { useMainStore } from "~/stores/main";

export async function getLanguages() {
  const { $langSettingsRep } = useNuxtApp();
  const langStStore = useLangSettingsStore();
  const mainStore = useMainStore();
  mainStore.loader = true;
  langStStore.languages = [];
  mainStore.langs = [];
  try {
    const res = await $langSettingsRep.getLanguages({
      page: langStStore.page,
      per_page: langStStore.perPage,
    });
    langStStore.languages = res.data;
    langStStore.languagesMeta = res.meta;
    let localLangs: string[] = [];
    langStStore.languages.forEach((item) => {
      localLangs.push(item.code);
      mainStore.langs.push(item.code);
    });
    const metaLangs = document.querySelector('meta[name="langs"]');
    if (metaLangs) {
      metaLangs.removeAttribute("content");
      metaLangs.setAttribute("content", localLangs.toString());
    }
    mainStore.loader = false;
  } catch (error) {
    console.error("Не удалось получить /admin/languages: ", error);
  }
}

export async function getLanguageById(id: number) {
  const { $langSettingsRep } = useNuxtApp();
  const langStStore = useLangSettingsStore();
  const mainStore = useMainStore();
  mainStore.loader = true;
  try {
    const res = await $langSettingsRep.getLanguageById(id);
    langStStore.languageId = res.data;
    mainStore.loader = false;
  } catch (error) {
    console.error("Не удалось получить /admin/language/ids: ", error);
  }
}

export async function deleteLanguageById(id: number) {
  const { $langSettingsRep } = useNuxtApp();
  const mainStore = useMainStore();
  mainStore.loader = true;
  try {
    const res = await $langSettingsRep.deleteLanguageById(id);
    getLanguages();
    mainStore.loader = false;
    return res;
  } catch (error) {
    console.error("Не удалось получить /admin/language/ids: ", error);
  }
}

type tCreateLanguage = {
  name: string;
  code: string;
  default: number;
};

export async function createLanguage(body: tCreateLanguage) {
  const { $langSettingsRep } = useNuxtApp();
  const mainStore = useMainStore();
  mainStore.loader = true;
  try {
    const res = await $langSettingsRep.createLanguage(body);
    getLanguages();
    mainStore.loader = true;
    return res;
  } catch (error) {
    console.error("Не удалось создать /admin/language: ", error);
  }
}

export async function updateLanguageById(id: number, body: tCreateLanguage) {
  const { $langSettingsRep } = useNuxtApp();
  const mainStore = useMainStore();
  mainStore.loader = true;
  try {
    const res = await $langSettingsRep.updateLanguageById(id, body);
    getLanguages();
    mainStore.loader = false;
    return res;
  } catch (error) {
    console.error("Не удалось получить /admin/language/ids: ", error);
  }
}
