import { Heading } from '@/components/gluestack-ui/heading';
import { HStack } from '@/components/gluestack-ui/hstack';
import { Icon } from '@/components/gluestack-ui/icon';
import { Pressable } from '@/components/gluestack-ui/pressable';
import { Text } from '@/components/gluestack-ui/text';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import React, { ReactNode } from 'react';
import { View } from 'react-native';

type Props = {
   title: string
   children: ReactNode
   hasBack?: boolean
}

const BaseLayout = ({ title, hasBack, children }: Props) => {
   const router = useRouter()
   return (
         
      <View className='w-full h-full bg-brand-200 py-6 px-4 flex-1'>
         {hasBack && (
            <Pressable className='mb-3' onPress={router.back}>
               <HStack className='items-center'>
                  <Icon as={ChevronLeft} className='text-brand-500' size='xl' />
                  <Text className='text-xl'>Voltar</Text>
               </HStack>
            </Pressable>
         )}
         <Heading size='2xl' className='text-brand-500'>{title}</Heading>
         <View className='mt-3 flex-1 mb-8'>
            {children}
         </View>
      </View>
   );
}

export default BaseLayout;