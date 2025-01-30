import type { TStaff } from "../Auth/auth.type";

export interface IMainStore {
  activeSidebarItem: number | null;
  asideFullWidth: boolean;
  staff: TStaff | null;
  loader: boolean;
  langs: string[];
}
