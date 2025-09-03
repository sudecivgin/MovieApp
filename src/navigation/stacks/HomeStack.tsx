import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';
import { HomeStackScreen } from './HomeStackScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

type Entry = [
  keyof typeof HomeStackScreen,
  (typeof HomeStackScreen)[keyof typeof HomeStackScreen]
];

const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      {(Object.entries(HomeStackScreen) as Entry[]).map(([name, cfg]) => (
        <Stack.Screen
          key={name}
          name={name as keyof RootStackParamList} 
          component={cfg.screen as React.ComponentType<any>}
          options={cfg.options}
          initialParams={cfg.initialParams}
        />
      ))}
    </Stack.Navigator>
  );
};

export default HomeStack;