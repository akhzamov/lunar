import type { TStaff } from "../Auth/auth.type";

export interface IMainStore {
  activeSidebarItem: number | null;
  asideFullWidth: boolean;
  staff: TStaff | null;
  loader: boolean;
  langs: string[];
  langsFull: { id: number; code: string; default: 1 | 0 }[] | null;
}
