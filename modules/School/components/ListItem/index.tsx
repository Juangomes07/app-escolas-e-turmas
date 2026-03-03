import { Badge, BadgeIcon, BadgeText } from '@/components/gluestack-ui/badge';
import { Box } from '@/components/gluestack-ui/box';
import { Button } from '@/components/gluestack-ui/button';
import { Heading } from '@/components/gluestack-ui/heading';
import { HStack } from '@/components/gluestack-ui/hstack';
import { Icon } from '@/components/gluestack-ui/icon';
import { Text } from '@/components/gluestack-ui/text';
import { VStack } from '@/components/gluestack-ui/vstack';
import { SchoolModel } from '@/models/school';
import { GraduationCap, MapPin, PenBox, Trash } from 'lucide-react-native';
import React from 'react';

// import { Container } from './styles';

type Props = {
   item: SchoolModel,
   handleEditPress:() => void
   handleDeletePress:() => void
}

const ListItem = ({ item,handleEditPress, handleDeletePress }: Props) => {
   return (
      <Box className='w-full p-4 bg-white rounded-xl'>
         <HStack className='justify-between'>
            <VStack className='gap-1'>
               <Heading className='flex items-center'>
                  {item.name}
               </Heading>
               <Badge className='w-[100px]' variant='solid' size='sm' action='info'>
                  <BadgeIcon as={GraduationCap} size='lg' className="mr-2" />
                  <BadgeText>{item.classes?.length || 0} Turmas</BadgeText>
               </Badge>
               <HStack className='items-center gap-1'>
                  <Icon as={MapPin} size='sm' />
                  <Text>{item.address}</Text>
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