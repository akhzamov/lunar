import type { ILoginStaff } from "~/types/Auth/auth.type";
import type { IAttributeByIdResponse, IAttributeResponse } from "../types/attributes.type";

export class AttributeRep {
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

  async getAttributes(
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IAttributeResponse> {
    const config = useRuntimeConfig();
    const authTokenCookie = useCookie("authToken");
    const authToken = authTokenCookie.value || "";
    return await this.request<IAttributeResponse>(
      "GET",
      `${config.public.apiBaseUrl}/attributes/paginate`,
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

  async getAttributeById(
    id: number,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IAttributeByIdResponse> {
    const config = useRuntimeConfig();
    const authTokenCookie = useCookie("authToken");
    const authToken = authTokenCookie.value || "";
    return await this.request<IAttributeByIdResponse>(
      "GET",
      `${config.public.apiBaseUrl}/attributes/${id}`,
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

  async createAttribute(
    body: Record<string | number | symbol, any>,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<ILoginStaff> {
    const config = useRuntimeConfig();
    const authTokenCookie = useCookie("authToken");
    const authToken = authTokenCookie.value || "";
    return await this.request<ILoginStaff>(
      "POST",
      `${config.public.apiBaseUrl}/attributes`,
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

  async updateAttributeById(
    id: string,
    body: Record<string | number | symbol, any>,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<ILoginStaff> {
    const config = useRuntimeConfig();
    const authTokenCookie = useCookie("authToken");
    const authToken = authTokenCookie.value || "";
    return await this.request<ILoginStaff>(
      "PUT",
      `${config.public.apiBaseUrl}/attributes/${id}`,
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

  async deleteAttributes(
    body: Record<string | number | symbol, any>,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<ILoginStaff> {
    const config = useRuntimeConfig();
    const authTokenCookie = useCookie("authToken");
    const authToken = authTokenCookie.value || "";
    return await this.request<ILoginStaff>(
      "POST",
      `${config.public.apiBaseUrl}/attributes/bulk-destroy`,
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

  async deleteAttributeById(
    id: string,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<ILoginStaff> {
    const config = useRuntimeConfig();
    const authTokenCookie = useCookie("authToken");
    const authToken = authTokenCookie.value || "";
    return await this.request<ILoginStaff>(
      "DELETE",
      `${config.public.apiBaseUrl}/attributes/${id}`,
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
