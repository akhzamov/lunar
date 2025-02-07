export interface IAttribute {
  id: number;
  position: number;
  required: 0 | 1;
  searchable: 0 | 1;
  system: 0 | 1;
  filterable: 0 | 1;
  name: Record<string, string>;
  description: Record<string, string>;
  attribute_type: string;
  default_value: string | null;
  handle: string;
  type: string;
  validation_rules: string | null;
  checked: boolean;
  attribute_group_id: number;
  configuration: {
    type: string;
    values?:
      | {
          richtext?: boolean;
          min?: number | null;
          max?: number | null;
        }
      | { id: number; name: string; value: string }[];
  };
  section: string;
  created_at: Date;
  updated_at: Date;
}

export interface ICreateAttributeBody {
  handle: string;
  searchable: boolean;
  filterable: boolean;
  required: boolean;
  type: string;
  attributeGroupId: number;
  configuration:
    | {
        type: string;
        values?: {
          richtext?: boolean;
          min?: number | null;
          max?: number | null;
        };
      }
    | {
        type: string;
        values: { id: number; name: string; value: string }[];
      };
  name: Record<string, string>;
  description: Record<string, string>;
}

export interface IAttributeResponseLinks {
  first: string | null;
  last: string | null;
  next: string | null;
  prev: string | null;
}

export interface IAttributeResponseMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: { active: boolean; label: string; url: string | null }[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface IAttributeResponse {
  data: IAttribute[];
  links: IAttributeResponseLinks;
  meta: IAttributeResponseMeta;
}

export interface IAttributeByIdResponse {
  data: IAttribute;
}
