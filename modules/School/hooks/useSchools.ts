import { useLogger } from "@/hooks/useLooger"
import { CreateSchoolPayload, EditSchoolPayload, SchoolModel } from "@/models/school"
import { HttpService } from "@/service/http-service"
import { useCallback, useMemo, useState } from "react"
import { SchoolService } from "../service/school-service"

const BASE_URL = "/api"
const LOGGER_TAG = "useSchools"

export const useSchools = () => {
  const logger = useLogger(LOGGER_TAG)
  const [isLoading, setIsLoading] = useState(false)
  const [schoolList, setSchoolList] = useState<SchoolModel[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [schoolSelected, setSchoolSelected] = useState<SchoolModel | null>(null)

  const service = useMemo(() => new SchoolService(new HttpService(BASE_URL)), [])

  const handleSelectSchool = (school: SchoolModel) => setSchoolSelected(school)
  const handleCleanSelectSchool = () => setSchoolSelected(null)

  const loadSchools = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await service.listAllSchools()
      setSchoolList(data)
    } catch (error) {
      logger.error("Erro ao carregar escolas")
    } finally {
      setIsLoading(false)
    }
  }, [logger, service])

  const deleteSchool = useCallback(async () => {
    if (!schoolSelected) {
      logger.warn("Nenhuma escola selecionada")
      return
    }

    const previous = schoolList
    setSchoolList((st) => st.filter((item) => item.id !== schoolSelected.id))

    try {
      await service.deleteSchoolById(schoolSelected.id)
    } catch (error) {
      
      setSchoolList(previous)
      logger.error("Erro ao excluir escola")
    } finally {
      handleCleanSelectSchool()
    }
  }, [logger, schoolList, schoolSelected, service])

  const createSchool = useCallback(
    async (data: CreateSchoolPayload) => {
      setIsLoading(true)
      try {
        const created = await service.createSchool(data)
        setSchoolList((st) => [created, ...st])
      } catch (error) {
        logger.error("Erro ao cadastrar escola")
      } finally {
        setIsLoading(false)
      }
    },
    [logger, service]
  )

  const editSchool = useCallback(
    async (data: EditSchoolPayload) => {
      setIsLoading(true)
      try {
        const updated = await service.editSchool(data)

        setSchoolList((st) => st.map((item) => (item.id === updated.id ? updated : item)))
        setSchoolSelected((st) => (st?.id === updated.id ? updated : st))
      } catch (error) {
        logger.error("Erro ao editar escola")
      } finally {
        setIsLoading(false)
      }
    },
    [logger, service]
  )

  return {
    loadSchools,
    deleteSchool,
    schoolList: searchTerm
      ? schoolList.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      : schoolList,
    handleSelectSchool,
    handleCleanSelectSchool,
    createSchool,
    isLoading,
    schoolSelected,
    editSchool,
    setSearchTerm,
  }
}
