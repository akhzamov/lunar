export type TStaff = {
  id: number;
  admin: number;
  firstname: string;
  lastname: string;
  email: string;
};

export interface ILoginStaff {
  data: {
    staff: TStaff;
    token: string;
  };
}
