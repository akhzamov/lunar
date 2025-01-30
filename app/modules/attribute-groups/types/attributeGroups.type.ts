export interface IAttributeGroups {
  id: number;
  type: string;
  name: string;
  handle: string;
  position: number;
  checked?: boolean;
}

export interface IAttributeGroup {
  id: number;
  attributable_type: string;
  name: Record<string, string>;
  handle: string;
  position: number;
  checked: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface IAttributeGroupResponseLinks {
  first: string | null;
  last: string | null;
  next: string | null;
  prev: string | null;
}

export interface IAttributeGroupResponseMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: { active: boolean; label: string; url: string | null }[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface IAttributeGroupResponse {
  data: IAttributeGroup[];
  links: IAttributeGroupResponseLinks;
  meta: IAttributeGroupResponseMeta;
}

export interface IAttributeGroupByIdResponse {
  data: IAttributeGroup;
}

export interface ICreateAttributeGroupResponse {
  data: IAttributeGroup;
}
export interface IDeleteAttributeGroupResponse {
  message?: string;
  error?: string;
}
