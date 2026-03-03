import { ClassesModel } from "@/models/classes";
import { HttpServiceInterface } from "@/service/http-service";

export class ClassesService {
   constructor(
      private httpService:HttpServiceInterface
   ){}

   public async listAllClasses(filters?:{schoolId?:string}):Promise<ClassesModel[]>{
      let filtersString = ``

      if(filters && filters.schoolId){
         filtersString = `?schoolId=${filters.schoolId}`
      }
      
      const response = await this.httpService.get<{classes:ClassesModel[]}>(`/classes${filtersString}`)
      return response.classes
   }

   public async deleteClassesById(id:string):Promise<void>{
      await this.httpService.delete(`/classes/${id}`)
   }

   public async createClass(payload: Omit<ClassesModel, 'id'>): Promise<ClassesModel> {
      const response = await this.httpService.post<{ classes: ClassesModel }>(`/classes`, { class: {...payload,schoolId:payload.school} })
      return response.classes
   }

   public async editClass({id,academicYear,name,shift,school}: ClassesModel): Promise<ClassesModel> {
      const payloadBody = {academicYear,name,shift,schoolId:school}

      const response = await this.httpService.put<{ classes: ClassesModel }>(`/classes/${id}`, { class: payloadBody })
      return response.classes
   }
}