import GenericForm, { FieldConfig, SelectOption } from '@/components/GenericForm';
import BaseLayout from '@/layout/BaseLayout';
import { useClassContext } from '@/providers/classes-context-provider';
import { useSchoolContext } from '@/providers/school-context-provider';
import { generateValidYearInterval } from '@/utils/year-interval';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import z from 'zod';

const ClassRegistrationSchema = z.object({
   name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres."),
   shift: z.string().min(3, "Turno deve ter pelo menos 3 caracteres."),
   academicYear: z.string().min(1, "O ano acadêmico é obrigatório."),
   school: z.string().min(1, "Selecione uma turma."),
});

type ClassRegistrationData = z.infer<typeof ClassRegistrationSchema>;

const SHIFT_OPTIONS: SelectOption[] = [
   { label: 'Manhã', value: 'Morning' },
   { label: 'Tarde', value: 'Afternoon' },
   { label: 'Noite', value: 'Night' },
];

const ACADEMIC_YEAR_OPTIONS = generateValidYearInterval().map(item =>({label:String(item),value:String(item)}))

const NewClass = () => {
   const { loadSchools, schoolList } = useSchoolContext()
   const { createClass } = useClassContext()
   const router = useRouter()
   const schoolsOptions = schoolList.map(item => ({ label: item.name, value: item.id }))
   const defaultValues: ClassRegistrationData = { name: '', shift: '', academicYear: '', school: '' };

   const handleCreate = async (data: ClassRegistrationData) => {
      await createClass({
         ...data,
         academicYear:Number(data.academicYear)
      })
      router.back()
   };

   const CLASSES_FIELDS: FieldConfig[] = [
      { name: 'name', label: 'Nome da Turma', type: 'text', placeholder: 'Digite o nome da turma...' },
      { name: 'shift', label: 'Turno', type: 'select', placeholder: 'selecione o turno', options: SHIFT_OPTIONS, isRequired: true },
      { name: 'academicYear', label: 'Ano acadêmico', type: 'select', placeholder: 'Selecione o ano...', options: ACADEMIC_YEAR_OPTIONS, isRequired:true },
      { name: 'school', label: 'Escola', type: 'select', placeholder: 'Selecione uma escola', options: schoolsOptions, isRequired: true },
   ];

   useFocusEffect(
      useCallback(() => {
         loadSchools()
      }, [])
   )

   return (
      <BaseLayout hasBack title='Nova turma'>
         <GenericForm
            schema={ClassRegistrationSchema}
            fields={CLASSES_FIELDS}
            defaultValues={defaultValues}
            onSubmit={handleCreate}
            buttonText="Cadastrar"
         />
      </BaseLayout>
   );
}

export default NewClass;