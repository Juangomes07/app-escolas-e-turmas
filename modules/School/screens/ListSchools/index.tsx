import DeleteItemModal, { DeleteItemModalRefHandle } from '@/components/DeleteItemModal';
import { Button, ButtonText } from '@/components/gluestack-ui/button';
import { Divider } from '@/components/gluestack-ui/divider';
import { HStack } from '@/components/gluestack-ui/hstack';
import { Icon } from '@/components/gluestack-ui/icon';
import { Input, InputField } from '@/components/gluestack-ui/input';
import { Text } from '@/components/gluestack-ui/text';
import { VStack } from '@/components/gluestack-ui/vstack';
import BaseLayout from '@/layout/BaseLayout';
import { SchoolModel } from '@/models/school';
import { useSchoolContext } from '@/providers/school-context-provider';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { PlusIcon } from 'lucide-react-native';
import React, { useCallback, useRef } from 'react';
import { FlatList } from 'react-native';
import ListItem from '../../components/ListItem';

const ListSchools = () => {
  const router = useRouter()
  const deleteModalRef = useRef<DeleteItemModalRefHandle>(null)
  const { loadSchools, schoolList, handleSelectSchool, deleteSchool, setSearchTerm } = useSchoolContext()

  useFocusEffect(
    useCallback(() =>{
      loadSchools()
    },[])
  )

  const handleOpenDeleteItemModal = (item:SchoolModel) =>{
    handleSelectSchool(item)
    deleteModalRef.current?.open()
  }

  const handleAdd = () => router.push('/school/new')

  const handleEdit = (item:SchoolModel) => {
    handleSelectSchool(item)
    router.push(`/school/edit/${item.id}`)
  };

  return (
    <BaseLayout hasBack title='Escolas'>
      <VStack className='items-end gap-2 mb-3'>
        <HStack className='w-full gap-2'>
          <Input
            className='flex-1 bg-white'
            isFocused={false}
            variant="outline"
            size="lg"
          >
            <InputField onChangeText={text => setSearchTerm(text)} placeholder="Filtre a escola de sua preferência..." />
          </Input>
          <Button onPress={handleAdd} className='h-full bg-green-500' variant='solid' action='positive'>
            <Icon as={PlusIcon} className='text-white' size='sm'/>
            <ButtonText className='text-white'>Adicionar</ButtonText>
          </Button>
        </HStack>

        <Text>{schoolList.length} escolas</Text>
      </VStack>
      <FlatList
        data={schoolList}
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
        onPerform={deleteSchool}
      />
    </BaseLayout>
  );
}

export default ListSchools;