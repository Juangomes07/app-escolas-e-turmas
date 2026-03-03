import { useLogger } from "@/hooks/useLooger"
import { ClassesModel, CreateClassesPayload, EditClassesPayload } from "@/models/classes"
import { HttpService } from "@/service/http-service"
import { useCallback, useMemo, useState } from "react"
import { ClassesService } from "../service/classes-service"

const BASE_URL = "/api"
const LOGGER_TAG = "useClasses"

export const useClasses = () => {
  const logger = useLogger(LOGGER_TAG)
  const [isLoading, setIsLoading] = useState(false)
  const [classesList, setClassesList] = useState<ClassesModel[]>([])
  const [classSelected, seClassSelected] = useState<ClassesModel | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const service = useMemo(() => new ClassesService(new HttpService(BASE_URL)), [])

  const handleSelectClass = (classSelect: ClassesModel) => seClassSelected(classSelect)
  const handleCleanSelectClass = () => seClassSelected(null)

  const loadClasses = useCallback(
    async (filters?: { schoolId?: string }) => {
      setIsLoading(true)
      try {
        const data = await service.listAllClasses(filters)
        setClassesList(data)
      } catch (error) {
        logger.error("Erro ao carregar turmas")
      } finally {
        setIsLoading(false)
      }
    },
    [logger, service]
  )

  const deleteClass = useCallback(async () => {
    if (!classSelected) {
      logger.warn("Nenhuma turma selecionada")
      return
    }

    // optimistic update
    const previous = classesList
    setClassesList((st) => st.filter((item) => item.id !== classSelected.id))

    try {
      await service.deleteClassesById(classSelected.id)
    } catch (error) {
      // rollback
      setClassesList(previous)
      logger.error("Erro ao excluir turma")
    } finally {
      handleCleanSelectClass()
    }
  }, [classSelected, classesList, logger, service])

  const createClass = useCallback(
    async (data: CreateClassesPayload) => {
      setIsLoading(true)
      try {
        const created = await service.createClass(data)
        setClassesList((st) => [created, ...st])
      } catch (error) {
        logger.error("Erro ao cadastrar turma")
      } finally {
        setIsLoading(false)
      }
    },
    [logger, service]
  )

  const editClass = useCallback(
    async (data: EditClassesPayload) => {
      setIsLoading(true)
      try {
        const updated = await service.editClass(data)
        setClassesList((st) => st.map((item) => (item.id === updated.id ? updated : item)))
        seClassSelected((st) => (st?.id === updated.id ? updated : st))
      } catch (error) {
        logger.error("Erro ao editar turma")
      } finally {
        setIsLoading(false)
      }
    },
    [logger, service]
  )

  return {
    loadClasses,
    isLoading,
    classesList: searchTerm
      ? classesList.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      : classesList,
    deleteClass,
    handleSelectClass,
    handleCleanSelectClass,
    classSelected,
    createClass,
    editClass,
    setSearchTerm,
  }
}
