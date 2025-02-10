import type { ILoginStaff } from "~/types/Auth/auth.type";
import type { IProductsResponse } from "../types/product.type";

type TBody = {
  email: string;
  password: string;
};

export class ProductsRep {
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

  async getProducts(
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IProductsResponse> {
    const config = useRuntimeConfig();
    const authTokenCookie = useCookie("authToken");
    const authToken = authTokenCookie.value || "";
    return await this.request<IProductsResponse>(
      "GET",
      `${config.public.apiBaseUrl}/products/paginate`,
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

  async getProductById(
    id: number,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<ILoginStaff> {
    const config = useRuntimeConfig();
    const authTokenCookie = useCookie("authToken");
    const authToken = authTokenCookie.value || "";
    return await this.request<ILoginStaff>(
      "GET",
      `${config.public.apiBaseUrl}/products/${id}`,
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
