import '@/global.css';
import 'react-native-reanimated';

import Header from '@/components/Header';
import RootProvider from '@/providers';
import { makeServer } from '@/server';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';


makeServer()

export default function RootLayout() {
  return (
    <RootProvider>
      <Stack
        screenOptions={{
          headerShown: true,
          gestureEnabled: true,
          header: () => <Header />
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="school/index" />
        <Stack.Screen name="school/new" />
        <Stack.Screen name="school/edit/[id]" />
        <Stack.Screen name="classes/index" />
        <Stack.Screen name="classes/new" />
        <Stack.Screen name="classes/edit/[id]" />
      </Stack>
      <StatusBar style="light" />
    </RootProvider>
  );
}
