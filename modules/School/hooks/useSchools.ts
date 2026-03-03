import { useLogger } from "@/hooks/useLooger"
import { CreateSchoolPayload, EditSchoolPayload, SchoolModel } from "@/models/school"
import { HttpService } from "@/service/http-service"
import { useCallback, useMemo, useState } from "react"
import { SchoolService } from "../service/school-service"

const BASE_URL = '/api'
const LOGGER_TAG = 'useLiuseSchoolsstSchools'

export const useSchools = () =>{
   const logger = useLogger(LOGGER_TAG)
   const [isLoading,setIsLoading] = useState(false)
   const [schoolList,setSchoolList] = useState<SchoolModel[]>([])
   const [searchTerm,setSearchTerm] = useState('')
   const [schoolSelected,setSchoolSelected] = useState<SchoolModel | null>(null)
   const service = useMemo(() => new SchoolService(new HttpService(BASE_URL)),[])

   const handleSelectSchool = (school:SchoolModel) => setSchoolSelected(school)
   const handleCleanSelectSchool = () => setSchoolSelected(null)

   const loadSchools = useCallback(async () =>{
      const data = await service.listAllSchools()
      setSchoolList(data)
   },[])

   const deleteSchool = useCallback(async () =>{
      if(!schoolSelected){
         logger.warn('Nenhuma escola selecionada')
         return   
      } 
      try {
         setSchoolList(st => st.filter(item => item.id !== schoolSelected.id))
         await service.deleteSchoolById(schoolSelected.id)
      } catch (error) {
         logger.error('Erro ao excluir escola')
      }finally{
         handleCleanSelectSchool()
      }
   },[schoolSelected])

   const createSchool = useCallback(async (data:CreateSchoolPayload) =>{
      setIsLoading(true)
      try {
         await service.createSchool(data)
      } catch (error) {
         logger.error('Erro ao cadastrar escola')
      }
      setIsLoading(false)
   },[])

   const editSchool = useCallback(async (data:EditSchoolPayload) =>{
      setIsLoading(true)
      try {
         await service.createSchool(data)
      } catch (error) {
         logger.error('Erro ao editar escola')
      }
      setIsLoading(false)
   },[])

   return{
      loadSchools,
      deleteSchool,
      schoolList: searchTerm ? schoolList.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())) : schoolList,
      handleSelectSchool,
      handleCleanSelectSchool,
      createSchool,
      isLoading,
      schoolSelected,
      editSchool,
      setSearchTerm
   }
}