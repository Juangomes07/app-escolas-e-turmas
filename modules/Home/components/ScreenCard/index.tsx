import { Box } from '@/components/gluestack-ui/box';
import { Heading } from '@/components/gluestack-ui/heading';
import { Pressable } from '@/components/gluestack-ui/pressable';
import { Text } from '@/components/gluestack-ui/text';
import { VStack } from '@/components/gluestack-ui/vstack';
import React, { ReactNode } from 'react';

type Props = {
   icon?:ReactNode
   title: string
   subtitle?: string
   onPress:() => void
} 

const ScreenCard = ({ icon, title, subtitle,onPress }: Props) => {
   return (
      <Pressable onPress={onPress}>
         <Box className='bg-white min-w-[180px] h-[180px] p-10 rounded-3xl  shadow-xs'>
            <VStack className='gap-1'>
               {icon}
               <Heading className='text-brand-500 font-roboto font-bold'>{title}</Heading>
               {subtitle && <Text className='text-neutral-500'>{subtitle}</Text>}
            </VStack>
         </Box>
      </Pressable>
   );
}

export default ScreenCard;