import { useLogger } from "@/hooks/useLooger"
import { ClassesModel, CreateClassesPayload, EditClassesPayload } from "@/models/classes"
import { HttpService } from "@/service/http-service"
import { useCallback, useMemo, useState } from "react"
import { ClassesService } from "../service/classes-service"

const BASE_URL = '/api'
const LOGGER_TAG = 'useClasses'

export const useClasses = () => {
   const logger = useLogger(LOGGER_TAG)
   const [isLoading, setIsLoading] = useState(false)
   const [classesList, setClassesList] = useState<ClassesModel[]>([])
   const [classSelected, seClassSelected] = useState<ClassesModel | null>(null)
   const [searchTerm,setSearchTerm] = useState('')
   const service = useMemo(() => new ClassesService(new HttpService(BASE_URL)), [])

   const handleSelectClass = (classSelect: ClassesModel) => seClassSelected(classSelect)
   const handleCleanSelectClass = () => seClassSelected(null)

   const loadClasses = useCallback(async (filters?:{schoolId?:string}) => {
      setIsLoading(true)
      const data = await service.listAllClasses(filters)
      setClassesList(data)
      setIsLoading(false)
   }, [])

   const deleteClass = useCallback(async () => {
      if (!classSelected) {
         logger.warn('Nenhuma turma selecionada')
         return
      }
      try {
         setClassesList(st => st.filter(item => item.id !== classSelected.id))
         await service.deleteClassesById(classSelected.id)
      } catch (error) {
         logger.error('Erro ao excluir escola')
      } finally {
         handleCleanSelectClass()
      }
   }, [classSelected])

   const createClass = useCallback(async (data: CreateClassesPayload) => {
      setIsLoading(true)
      try {
         await service.createClass(data)
      } catch (error) {
         logger.error('Erro ao cadastrar turma')
      }
      setIsLoading(false)
   }, [])

   const editClass = useCallback(async (data: EditClassesPayload) => {
      setIsLoading(true)
      try {
         await service.editClass(data)
      } catch (error) {
         logger.error('Erro ao editar turma')
      }
      setIsLoading(false)
   }, [])

   return {
      loadClasses,
      isLoading,
      classesList: searchTerm ? classesList.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())) : classesList,
      deleteClass,
      handleSelectClass,
      handleCleanSelectClass,
      classSelected,
      createClass,
      editClass,
      setSearchTerm
   }
}