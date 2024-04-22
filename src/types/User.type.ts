export enum Roles {
  Student = "student",
  Teacher = "teacher",
  Company = "company",
}
export type UserInfo = {
  firstName: string;
  lastName: string;
  role: Roles;
  birthDate: string;
};
