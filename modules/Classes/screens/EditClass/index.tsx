import GenericForm, { FieldConfig, SelectOption } from '@/components/GenericForm';
import BaseLayout from '@/layout/BaseLayout';
import { useClassContext } from '@/providers/classes-context-provider';
import { useSchoolContext } from '@/providers/school-context-provider';
import { REVERSE_SHIFT_MAP, SHIFT_MAP } from '@/utils/classes-map';
import { generateValidYearInterval } from '@/utils/year-interval';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import z from 'zod';

const ClassEditSchema = z.object({
   name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres."),
   shift: z.string().min(3, "Turno deve ter pelo menos 3 caracteres."),
   academicYear: z.string().min(1, "O ano acadêmico é obrigatório."),
   school: z.string().min(1, "Selecione uma turma."),
});

type ClassEditData = z.infer<typeof ClassEditSchema>;

const SHIFT_OPTIONS: SelectOption[] = [
   { label: 'Manhã', value: 'Morning' },
   { label: 'Tarde', value: 'Afternoon' },
   { label: 'Noite', value: 'Night' },
];

const ACADEMIC_YEAR_OPTIONS = generateValidYearInterval().map(item =>({label:String(item),value:String(item)}))

const EditClass = () => {
   const { loadSchools, schoolList } = useSchoolContext()
   const { classSelected, editClass } = useClassContext()
   const router = useRouter()
   const [initialValues, setInitialValues] = useState<ClassEditData | null>(null);
   const schoolsOptions = schoolList.map(item => ({ label: item.name, value: item.id }))

   const handleCreate = async (data: ClassEditData) => {
      await editClass({
         ...data,
         id: classSelected?.id || '',
         academicYear:Number(data.academicYear),
         shift: REVERSE_SHIFT_MAP[data.shift],
         school: schoolsOptions.find(item => item.label === data.school)?.value
      })
      router.back()
   };

   const CLASSES_FIELDS: FieldConfig[] = [
      { name: 'name', label: 'Nome da Turma', type: 'text', placeholder: 'Digite o nome da turma...' },
      { name: 'shift', label: 'Turno', type: 'select', placeholder: 'selecione o turno', options: SHIFT_OPTIONS, isRequired: true },
      { name: 'academicYear', label: 'Ano acadêmico', type: 'select', placeholder: 'Selecione o ano...', options: ACADEMIC_YEAR_OPTIONS, isRequired: true },
      { name: 'school', label: 'Escola', type: 'select', placeholder: 'Selecione uma escola', options: schoolsOptions, isRequired: true },
   ];

   useFocusEffect(
      useCallback(() => {
         loadSchools()
      }, [])
   )

   useEffect(() => {
      console.info(classSelected)
      if (classSelected) {
         const school = schoolList.find(item => item.id === classSelected?.school)?.name
         if (school) {
            const formattedValues = {
               ...classSelected,
               academicYear: ACADEMIC_YEAR_OPTIONS.find(item => Number(item.value) === classSelected.academicYear)?.value,
               shift: SHIFT_MAP[classSelected.shift],
               school
            } as any
            setInitialValues(formattedValues)
         }
      }
   }, [classSelected])

   return (
      <BaseLayout hasBack title='Editar turma'>
         {initialValues && (
            <GenericForm
               schema={ClassEditSchema}
               fields={CLASSES_FIELDS}
               defaultValues={initialValues}
               onSubmit={handleCreate}
               buttonText="Salvar alterações"
            />
         )}

      </BaseLayout>
   );
}

export default EditClass;