import GenericForm, { FieldConfig } from '@/components/GenericForm';
import BaseLayout from '@/layout/BaseLayout';
import { useSchoolContext } from '@/providers/school-context-provider';
import { useRouter } from 'expo-router';
import React from 'react';
import z from 'zod';

const SchoolRegistrationSchema = z.object({
   name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres."),
   address: z.string().min(5, "O endereço é obrigatório."),
 });

type SchoolRegistrationData = z.infer<typeof SchoolRegistrationSchema>;

const SCHOOL_FIELDS: FieldConfig[] = [
   { name: 'name', label: 'Nome Completo', type: 'text', placeholder: 'Seu nome' },
   { name: 'address', label: 'Endereço', type: 'text', placeholder: 'Rua, Número', isRequired: true },
];

const EditSchool = () => {
   const route = useRouter();
   const { schoolSelected, editSchool, isLoading } = useSchoolContext()

   const handleEdit = async (data: SchoolRegistrationData) => {
      await editSchool({
         id:schoolSelected?.id || '',
         ...data
      })
      route.back()
   };

   return (
      <BaseLayout hasBack title='Editar escola'>
         {schoolSelected && (
            <GenericForm
               schema={SchoolRegistrationSchema}
               fields={SCHOOL_FIELDS}
               defaultValues={schoolSelected}
               onSubmit={handleEdit}
               buttonText="Salvar Alterações"
               isLoading={isLoading}
            />
         )}
      </BaseLayout>
   );
}

export default EditSchool;