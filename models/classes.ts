export type ClassesModel = {
  id: string;
  name: string;
  shift: string;
  academicYear: number;
  school?:string
};



export type CreateClassesPayload = {} & Omit<ClassesModel, 'id'>
export type EditClassesPayload = {} & ClassesModel
