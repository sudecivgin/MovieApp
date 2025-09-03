import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';
import { HomeStackScreen } from './HomeStackScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

type Entry = [
  keyof RootStackParamList,
  (typeof HomeStackScreen)[keyof typeof HomeStackScreen]
];

const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      {(Object.entries(HomeStackScreen) as Entry[]).map(([name, cfg]) => (
        <Stack.Screen
 key={String(name)}          
  name={name as keyof RootStackParamList}
          component={cfg.screen as React.ComponentType<any>}
          options={cfg.options}
        />
      ))}
    </Stack.Navigator>
  );
};

export default HomeStack;
