// GenericForm.tsx

import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDownIcon } from 'lucide-react-native';
import React from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import { z } from 'zod';
import { Button, ButtonText } from '../gluestack-ui/button';
import { FormControl, FormControlError, FormControlErrorText, FormControlLabel, FormControlLabelText } from '../gluestack-ui/form-control';
import { Input, InputField } from '../gluestack-ui/input';
import { Select, SelectBackdrop, SelectContent, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger } from '../gluestack-ui/select';
import { Spinner } from '../gluestack-ui/spinner';
import { VStack } from '../gluestack-ui/vstack';

export type InputType = 'text' | 'number' | 'select' | 'email';

export interface SelectOption {
   label: string;
   value: string;
}
export interface FieldConfig {
   name: string;
   label: string;
   type: InputType;
   placeholder?: string;
   isRequired?: boolean;
   options?: SelectOption[];
}
export type FormSchema = z.ZodObject;
export type FormValues<T extends FormSchema> = z.infer<T>;
interface GenericFormProps<T extends FormSchema> {
   schema: T;
   fields: FieldConfig[];
   defaultValues: FormValues<T>;
   onSubmit: (data: FormValues<T>) => void;
   buttonText?: string;
   isLoading?:boolean
}
interface RenderInputProps {
   control: any;
   config: FieldConfig;
   errors: FieldValues;
}

const RenderInput: React.FC<RenderInputProps> = ({ control, config, errors }) => {

   const renderSelect = ({ field }: { field: any }) => (
      <Select className='bg-white' onValueChange={field.onChange} selectedValue={field.value}>
         <SelectTrigger className='flex items-center justify-between' variant="outline" size="md">
            <SelectInput placeholder={config.placeholder} />
            <SelectIcon className="mr-3" as={ChevronDownIcon} />
         </SelectTrigger>
         <SelectPortal>
            <SelectBackdrop />
            <SelectContent style={{ maxHeight: 300 }}>
               <ScrollView style={{width:'100%'}}>
               {config.options?.map((item) => (
                  <SelectItem key={item.value} label={item.label} value={item.value} />
               ))}
               </ScrollView>
            </SelectContent>
         </SelectPortal>
      </Select>
   );

   const renderTextInput = ({ field }: { field: any }) => {
      let keyboardType: 'default' | 'numeric' | 'email-address' = 'default';
      if (config.type === 'number') keyboardType = 'numeric';
      if (config.type === 'email') keyboardType = 'email-address';

      return (
         <Input className='bg-white'>
            <InputField
               placeholder={config.placeholder}
               onChangeText={field.onChange}
               onBlur={field.onBlur}
               value={field.value as string}
               keyboardType={keyboardType}
            />
         </Input>
      );
   }

   const hasError = errors[config.name];
   const errorMessage = hasError?.message as string;

   return (
      <FormControl isRequired={config.isRequired} isInvalid={!!hasError}>
         <FormControlLabel>
            <FormControlLabelText>{config.label}</FormControlLabelText>
         </FormControlLabel>

         <Controller
            control={control}
            name={config.name}
            render={({ field }) => (
               config.type === 'select'
                  ? renderSelect({ field })
                  : renderTextInput({ field })
            )}
         />

         {hasError && (
            <FormControlError>
               <FormControlErrorText>{errorMessage}</FormControlErrorText>
            </FormControlError>
         )}
      </FormControl>
   );
};

const GenericForm = <T extends FormSchema>({
   schema,
   fields,
   defaultValues,
   onSubmit,
   buttonText = "Salvar",
   isLoading = false
}: GenericFormProps<T>) => {

   const {
      control,
      handleSubmit,
      formState: { errors }
   } = useForm<FormValues<T>>({
      resolver: zodResolver(schema),
      defaultValues: defaultValues,
   });

   return (
      <VStack space="xl" style={{ padding: 20 }}>
         {fields.map((config) => (
            <RenderInput
               key={config.name}
               config={config}
               control={control}
               errors={errors}
            />
         ))}

         <Button className='bg-brand-500' variant='solid' disabled={isLoading} onPress={handleSubmit(onSubmit)} mt="$4">
            {isLoading ? (
               <Spinner />
            ):(
               <ButtonText>{buttonText}</ButtonText>
            )}
         </Button>
      </VStack>
   );
};

export default GenericForm;