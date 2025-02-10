import type { ILoginStaff } from "~/types/Auth/auth.type";
import type {
  ICreateProductTypeId,
  IProductType,
  IProductTypeId,
  IProductTypeResponse,
} from "../types/productType.type";

type TBody = {
  email: string;
  password: string;
};

export class ProductTypesRep {
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

  async getProductTypes(
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IProductTypeResponse> {
    const config = useRuntimeConfig();
    const authTokenCookie = useCookie("authToken");
    const authToken = authTokenCookie.value || "";
    return await this.request<IProductTypeResponse>(
      "GET",
      `${config.public.apiBaseUrl}/types/paginate`,
      {
        params: {
          ...params,
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
          // "Origin": window.location.origin,
          ...headers,
        },
      }
    );
  }

  async getProductTypeById(
    id: number,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IProductTypeId> {
    const config = useRuntimeConfig();
    const authTokenCookie = useCookie("authToken");
    const authToken = authTokenCookie.value || "";
    return await this.request<IProductTypeId>(
      "GET",
      `${config.public.apiBaseUrl}/types/${id}`,
      {
        params: {
          ...params,
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
          // "Origin": window.location.origin,
          ...headers,
        },
      }
    );
  }

  async createProductType(
    body: Record<string | number | symbol, any>,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<ICreateProductTypeId> {
    const config = useRuntimeConfig();
    const authTokenCookie = useCookie("authToken");
    const authToken = authTokenCookie.value || "";
    return await this.request<ICreateProductTypeId>(
      "POST",
      `${config.public.apiBaseUrl}/types`,
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
          // "Origin": window.location.origin,
          ...headers,
        },
      }
    );
  }

  async updateProductTypeById(
    id: number,
    body: Record<string | number | symbol, any>,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<ICreateProductTypeId> {
    const config = useRuntimeConfig();
    const authTokenCookie = useCookie("authToken");
    const authToken = authTokenCookie.value || "";
    return await this.request<ICreateProductTypeId>(
      "PUT",
      `${config.public.apiBaseUrl}/types/${id}`,
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
          // "Origin": window.location.origin,
          ...headers,
        },
      }
    );
  }

  async deleteProductTypes(
    body: Record<string | number | symbol, any>,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<ILoginStaff> {
    const config = useRuntimeConfig();
    const authTokenCookie = useCookie("authToken");
    const authToken = authTokenCookie.value || "";
    return await this.request<ILoginStaff>(
      "POST",
      `${config.public.apiBaseUrl}/types/bulk-destroy`,
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
          // "Origin": window.location.origin,
          ...headers,
        },
      }
    );
  }

  async deleteProductTypeById(
    id: number,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<ILoginStaff> {
    const config = useRuntimeConfig();
    const authTokenCookie = useCookie("authToken");
    const authToken = authTokenCookie.value || "";
    return await this.request<ILoginStaff>(
      "DELETE",
      `${config.public.apiBaseUrl}/types/${id}`,
      {
        params: {
          ...params,
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
          // "Origin": window.location.origin,
          ...headers,
        },
      }
    );
  }
}
