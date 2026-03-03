import { ClassesModel } from "./classes";

export type SchoolModel = {
  id: string;
  name: string;
  address: string;
  classes?:ClassesModel[]
};

export type CreateSchoolPayload = {} & Omit<SchoolModel, 'classes' | 'id'>
export type EditSchoolPayload = {} & Omit<SchoolModel, 'classes'>
