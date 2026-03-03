import { Box } from '@/components/gluestack-ui/box';
import { Button } from '@/components/gluestack-ui/button';
import { Heading } from '@/components/gluestack-ui/heading';
import { HStack } from '@/components/gluestack-ui/hstack';
import { Icon } from '@/components/gluestack-ui/icon';
import { Text } from '@/components/gluestack-ui/text';
import { VStack } from '@/components/gluestack-ui/vstack';
import { ClassesModel } from '@/models/classes';
import { SHIFT_MAP } from '@/utils/classes-map';
import { Calendar, Clock, PenBox, Trash } from 'lucide-react-native';
import React from 'react';

// import { Container } from './styles';

type Props = {
   item: ClassesModel
   handleEditPress: () => void
   handleDeletePress: () => void
}

const ListItem = ({ item, handleEditPress, handleDeletePress  }: Props) => {
   return (
      <Box className='w-full p-4 bg-white rounded-xl'>
         <HStack className='justify-between'>
            <VStack className='gap-1'>
               <HStack className='gap-3'>
                  <Heading className='flex items-center truncate'>
                     {item.name}
                  </Heading>
               </HStack>
               <HStack className='gap-3'>
                  <HStack className='items-center gap-1'>
                     <Icon as={Clock} size='sm' />
                     <Text>{SHIFT_MAP[item.shift]}</Text>
                  </HStack>
                  <HStack className='items-center gap-1'>
                     <Icon as={Calendar} size='sm' />
                     <Text className='flex items-center'>
                        {item.academicYear}
                     </Text>
                  </HStack>
               </HStack>

            </VStack>
            <HStack className='gap-2'>
               <Button onPress={handleEditPress} variant='solid' className='bg-brand-500 p-2'>
                  <Icon as={PenBox} className='text-white' size='md' />
               </Button>
               <Button onPress={handleDeletePress} variant='solid' className='bg-red-400 p-2'>
                  <Icon as={Trash} className='text-white' size='md' />
               </Button>
            </HStack>
         </HStack>

      </Box>
   );
}

export default ListItem;