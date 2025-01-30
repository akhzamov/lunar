export type TLanguage = {
  id: number;
  code: string;
  name: string;
  default: number;
  created_at: Date;
  updated_at: Date;
};

export interface ILanguageResponseLinks {
  first: string | null;
  last: string | null;
  next: string | null;
  prev: string | null;
}

export interface ILanguageResponseMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: { active: boolean; label: string; url: string | null }[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface ILanguagesResponse {
  data: TLanguage[];
  links: ILanguageResponseLinks;
  meta: ILanguageResponseMeta;
}

export interface ILanguageByIdResponse {
  data: TLanguage;
}

export type TLanguageCreateResponse = {
  data: {
    message: string;
  };
};
