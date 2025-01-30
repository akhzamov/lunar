import type { ILoginStaff } from "~/types/Auth/auth.type";
import type {
  ILanguageByIdResponse,
  ILanguagesResponse,
  TLanguageCreateResponse,
} from "~/types/LangSettings/langSettings.type";

export class LangSettingsRep {
  private async request<T>(
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    url: string,
    options?: Record<string, any>
  ): Promise<T> {
    return await $fetch<T>(url, {
      method,
      ...options,
    });
  }

  async getLanguages(
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<ILanguagesResponse> {
    const config = useRuntimeConfig();
    const authTokenCookie = useCookie("authToken");
    const authToken = authTokenCookie.value || "";
    return await this.request<ILanguagesResponse>(
      "GET",
      `${config.public.apiBaseUrl}/languages/paginate`,
      {
        params: {
          ...params,
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
          ...headers,
        },
      }
    );
  }

  async getLanguageById(
    id: number,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<ILanguageByIdResponse> {
    const config = useRuntimeConfig();
    const authTokenCookie = useCookie("authToken");
    const authToken = authTokenCookie.value || "";
    return await this.request<ILanguageByIdResponse>(
      "GET",
      `${config.public.apiBaseUrl}/languages/${id}`,
      {
        params: {
          ...params,
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
          ...headers,
        },
      }
    );
  }

  async createLanguage(
    body: Record<string | number | symbol, any>,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<TLanguageCreateResponse> {
    const config = useRuntimeConfig();
    const authTokenCookie = useCookie("authToken");
    const authToken = authTokenCookie.value || "";
    return await this.request<TLanguageCreateResponse>(
      "POST",
      `${config.public.apiBaseUrl}/languages`,
      {
        params: {
          ...params,
        },
        body: {
          ...body,
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
          ...headers,
        },
      }
    );
  }

  async updateLanguageById(
    id: number,
    body: Record<string | number | symbol, any>,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<ILoginStaff> {
    const config = useRuntimeConfig();
    const authTokenCookie = useCookie("authToken");
    const authToken = authTokenCookie.value || "";
    return await this.request<ILoginStaff>(
      "PUT",
      `${config.public.apiBaseUrl}/languages/${id}`,
      {
        params: {
          ...params,
        },
        body: {
          ...body,
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
          ...headers,
        },
      }
    );
  }

  async deleteLanguageById(
    id: number,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<TLanguageCreateResponse> {
    const config = useRuntimeConfig();
    const authTokenCookie = useCookie("authToken");
    const authToken = authTokenCookie.value || "";
    return await this.request<TLanguageCreateResponse>(
      "DELETE",
      `${config.public.apiBaseUrl}/languages/${id}`,
      {
        params: {
          ...params,
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
          ...headers,
        },
      }
    );
  }
}
