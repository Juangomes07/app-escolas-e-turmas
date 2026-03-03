import { SchoolModel } from "@/models/school";
import { HttpServiceInterface } from "@/service/http-service";

export class SchoolService {
   constructor(
      private httpService:HttpServiceInterface
   ){}

   public async listAllSchools():Promise<SchoolModel[]>{
      const response = await this.httpService.get<{schools:SchoolModel[]}>(`/schools`)
      return response.schools
   }

   public async deleteSchoolById(id:string):Promise<void>{
      await this.httpService.delete(`/schools/${id}`)
   }

   public async createSchool(payload:Omit<SchoolModel, 'classes' | 'id'>):Promise<SchoolModel>{
      const response =  await this.httpService.post<{schools:SchoolModel}>(`/schools`,{school:payload})
      return response.schools
   }
   
   public async editSchool({address,id,name}:Omit<SchoolModel, 'classes'>):Promise<SchoolModel>{
      const payloadBody = {name,address}
      const response =  await this.httpService.put<{schools:SchoolModel}>(`/schools/${id}`,{school:payloadBody})
      return response.schools
   }
}