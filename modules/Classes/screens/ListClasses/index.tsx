import DeleteItemModal, { DeleteItemModalRefHandle } from '@/components/DeleteItemModal';
import { Button, ButtonText } from '@/components/gluestack-ui/button';
import { Divider } from '@/components/gluestack-ui/divider';
import { HStack } from '@/components/gluestack-ui/hstack';
import { Icon } from '@/components/gluestack-ui/icon';
import { Input, InputField } from '@/components/gluestack-ui/input';
import { Pressable } from '@/components/gluestack-ui/pressable';
import { Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger } from '@/components/gluestack-ui/select';
import { VStack } from '@/components/gluestack-ui/vstack';
import { useToggle } from '@/hooks/useToggle';
import BaseLayout from '@/layout/BaseLayout';
import { ClassesModel } from '@/models/classes';
import { useClassContext } from '@/providers/classes-context-provider';
import { useSchoolContext } from '@/providers/school-context-provider';
import { useFocusEffect, useRouter } from 'expo-router';
import { ChevronDownIcon, Funnel, PlusIcon } from 'lucide-react-native';
import React, { useCallback, useRef } from 'react';
import { Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ListItem from '../../components/ListItem';

const ListClasses = () => {
  const router = useRouter()
  const deleteModalRef = useRef<DeleteItemModalRefHandle>(null)
  const { isToggled, toggle } = useToggle()

  const { loadClasses, classesList, handleSelectClass, deleteClass, setSearchTerm } = useClassContext()
  const { loadSchools, schoolList } = useSchoolContext()

  useFocusEffect(
    useCallback(() => {
      loadClasses()
      loadSchools()
    }, [])
  )

  const handleOpenDeleteItemModal = (item: ClassesModel) => {
    handleSelectClass(item)
    deleteModalRef.current?.open()
  }

  const handleAdd = () => router.push('/classes/new')

  const handleEdit = (item: ClassesModel) => {
    handleSelectClass(item)
    router.push(`/classes/edit/${item.id}`)
  }

  return (
    <BaseLayout hasBack title='Turmas'>
      <VStack className='items-end gap-2 mb-4'>
        <HStack className='w-full gap-2'>
          <Input
            className='flex-1 bg-white'
            isFocused={false}
            variant="outline"
            size="lg"
          >
            <InputField onChangeText={text => setSearchTerm(text)} placeholder="Filtre a Turma de sua preferência..." />
          </Input>
          <Button onPress={handleAdd} className='h-full bg-green-500' variant='solid' action='positive'>
            <Icon as={PlusIcon} className='text-white' size='sm' />
            <ButtonText className='text-white'>Adicionar</ButtonText>
          </Button>
        </HStack>
        <HStack className='w-full justify-between mt-2'>
          <Pressable onPress={toggle}>
            <HStack className='gap-1'>
              <Icon as={Funnel} className='' />
              <Text>Filtros</Text>
            </HStack>
          </Pressable>
          <Text>{classesList.length} turmas</Text>
        </HStack>
      </VStack>
      {isToggled && (
        <VStack className='mb-2 gap-3'>
          <Select onValueChange={value => loadClasses({ schoolId: value })}>
            <SelectTrigger className='bg-white' variant="outline" size="md">
              <SelectInput className='flex-1' placeholder="Selecione uma escola" />
              <SelectIcon className="mr-3" as={ChevronDownIcon} />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent >
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                {schoolList.map(item => (
                  <SelectItem key={item.id} label={item.name} value={item.id} />
                ))}
              </SelectContent>
            </SelectPortal>
          </Select>
          <Button onPress={loadClasses} className='bg-brand-500' variant='solid' action='default'>
            <ButtonText className='text-white'>Limpar filtros</ButtonText>
          </Button>
        </VStack>
      )}

      <FlatList
        data={classesList}
        renderItem={({ item }) => <ListItem
          item={item}
          handleEditPress={() => handleEdit(item)}
          handleDeletePress={() => handleOpenDeleteItemModal(item)}
        />}
        ItemSeparatorComponent={() => <Divider className='my-2' />}
      />
      <DeleteItemModal
        ref={deleteModalRef}
        title='Excluir item'
        subtitle='Deseja realmente excluir este item? essa ação nao podera ser desfeita.'
        performButtonLabel='Excluir'
        performButtonClassName='bg-red-400'
        onPerform={deleteClass}
      />
    </BaseLayout>
  );
}

export default ListClasses;