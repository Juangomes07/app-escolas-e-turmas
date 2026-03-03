import { Grid, GridItem } from '@/components/gluestack-ui/grid';
import { Icon } from '@/components/gluestack-ui/icon';
import BaseLayout from '@/layout/BaseLayout';
import { useRouter } from 'expo-router';
import { GraduationCap, School } from 'lucide-react-native';
import React from 'react';
import ScreenCard from '../components/ScreenCard';

const HomeScreen = () => {
   const router = useRouter()

   return (
      <BaseLayout title={'Home'}>
         <Grid className="gap-4" _extra={{ className: 'grid-cols-2' }}>
            <GridItem _extra={{ className: 'col-span-1' }}>
               <ScreenCard
                  icon={<Icon as={School} className='text-brand-500' size='4xl' />}
                  title='Escolas'
                  subtitle='Veja as escolas cadastradas'
                  onPress={() => router.push('/school')}
               />
            </GridItem>
            <GridItem _extra={{ className: 'col-span-1' }}>
               <ScreenCard
                  icon={<Icon as={GraduationCap} className='text-brand-500' size='4xl' />}
                  title='Turmas'
                  subtitle='Veja as turmas cadastradas'
                  onPress={() => router.push('/classes')}

               />
            </GridItem>
         </Grid>
      </BaseLayout>
   );
}

export default HomeScreen;