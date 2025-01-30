import type {
  ILanguageResponseMeta,
  TLanguage,
} from "~/types/LangSettings/langSettings.type";

export interface ILangSettingsStore {
  languages: TLanguage[] | null;
  languageId: TLanguage | null;
  languagesMeta: ILanguageResponseMeta | null;
  page: number;
  perPage: number;
}
