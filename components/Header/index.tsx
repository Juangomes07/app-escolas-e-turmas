import React from 'react';
import { Image, View } from 'react-native';
import { VStack } from '../gluestack-ui/vstack';

// import { Container } from './styles';

const Header = () => {
  return(
   <View className='w-full min-h-[130px] bg-brand-500 px-4 justify-end border-none'>
      <VStack className='mb-5'>
        <Image
           source={require('../../assets/images/logo.png')} 
           style={{width:130,height:32}} 
           resizeMode='contain'
           alt='logo image'
         />
      </VStack>
   </View>
  );
}

export default Header;