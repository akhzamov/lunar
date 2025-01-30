import type { ILoginStaff } from "~/types/Auth/auth.type";
import type {
  IAttributeGroupByIdResponse,
  IAttributeGroupResponse,
  ICreateAttributeGroupResponse,
  IDeleteAttributeGroupResponse,
} from "../types/attributeGroups.type";

export class AttributeGroupRep {
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

  async getAttributeGroups(
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IAttributeGroupResponse> {
    const config = useRuntimeConfig();
    const authTokenCookie = useCookie("authToken");
    const authToken = authTokenCookie.value || "";
    return await this.request<IAttributeGroupResponse>(
      "GET",
      `${config.public.apiBaseUrl}/attribute-groups/paginate`,
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

  async getAttributeGroupById(
    id: number,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IAttributeGroupByIdResponse> {
    const config = useRuntimeConfig();
    const authTokenCookie = useCookie("authToken");
    const authToken = authTokenCookie.value || "";
    return await this.request<IAttributeGroupByIdResponse>(
      "GET",
      `${config.public.apiBaseUrl}/attribute-groups/${id}`,
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

  async createAttributeGroup(
    body: Record<string | number | symbol, any>,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<ICreateAttributeGroupResponse> {
    const config = useRuntimeConfig();
    const authTokenCookie = useCookie("authToken");
    const authToken = authTokenCookie.value || "";
    return await this.request<ICreateAttributeGroupResponse>(
      "POST",
      `${config.public.apiBaseUrl}/attribute-groups`,
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

  async updateAttributeGroupById(
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
      `${config.public.apiBaseUrl}/attribute-groups/${id}`,
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

  async deleteAttributeGroups(
    body: Record<string | number | symbol, any>,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<ILoginStaff> {
    const config = useRuntimeConfig();
    const authTokenCookie = useCookie("authToken");
    const authToken = authTokenCookie.value || "";
    return await this.request<ILoginStaff>(
      "POST",
      `${config.public.apiBaseUrl}/attribute-groups/bulk-destroy`,
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
    id: number,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IDeleteAttributeGroupResponse> {
    const config = useRuntimeConfig();
    const authTokenCookie = useCookie("authToken");
    const authToken = authTokenCookie.value || "";
    return await this.request<IDeleteAttributeGroupResponse>(
      "DELETE",
      `${config.public.apiBaseUrl}/attribute-groups/${id}`,
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
