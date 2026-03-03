import React, { ReactNode } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ClassProvider } from './classes-context-provider';
import { GluestackUIProvider } from './gluestack-ui-provider';
import { SchoolProvider } from './school-context-provider';

type Props = {
   children: ReactNode
}
const RootProvider = ({ children }: Props) => {
   return (
      <GluestackUIProvider>
         <SchoolProvider>
            <ClassProvider>
               <GestureHandlerRootView style={{ flex: 1 }}>
                  {children}
               </GestureHandlerRootView>
            </ClassProvider>
         </SchoolProvider>
      </GluestackUIProvider>
   );
}

export default RootProvider;