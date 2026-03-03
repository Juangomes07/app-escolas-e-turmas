import GenericForm, { FieldConfig } from '@/components/GenericForm';
import BaseLayout from '@/layout/BaseLayout';
import { useSchoolContext } from '@/providers/school-context-provider';
import { useRouter } from 'expo-router';
import React from 'react';
import z from 'zod';

const SchoolRegistrationSchema = z.object({
   name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres."),
   address: z.string().min(5, "O endereço é obrigatório.")
});

type SchoolRegistrationData = z.infer<typeof SchoolRegistrationSchema>;

const SCHOOL_FIELDS: FieldConfig[] = [
   { name: 'name', label: 'Nome da escola', type: 'text', placeholder: 'Digite o nome da escola...' },
   { name: 'address', label: 'Endereço', type: 'text', placeholder: 'Digite o endereço...', isRequired: true },
];

const NewSchool = () => {
   const { createSchool,isLoading } = useSchoolContext()
   const router = useRouter()
   const defaultValues: SchoolRegistrationData = { name: '', address: '' };
   
   const handleCreate = async (data: SchoolRegistrationData) => {
      await createSchool(data)
      router.back()
   };
   
   return (
      <BaseLayout hasBack title='Nova escola'>
         <GenericForm
            schema={SchoolRegistrationSchema}
            fields={SCHOOL_FIELDS}
            defaultValues={defaultValues}
            onSubmit={handleCreate}
            buttonText="Cadastrar"
            isLoading={isLoading}
         />
      </BaseLayout>
   );
}

export default NewSchool;