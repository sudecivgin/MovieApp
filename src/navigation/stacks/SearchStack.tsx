import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';
import { SearchStackScreen } from './SearchStackScreen';

type SearchStackParamList = Pick<RootStackParamList, 'Search'>;
const Stack = createNativeStackNavigator<SearchStackParamList>();

type Entry = [
  keyof SearchStackParamList,
  (typeof SearchStackScreen)[keyof SearchStackParamList]
];

const SearchStack: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Search">
    {(Object.entries(SearchStackScreen) as Entry[]).map(([name, cfg]) => (
      <Stack.Screen
        key={name}
        name={name}
        component={cfg.screen as React.ComponentType<any>}
        options={cfg.options}
      />
    ))}
  </Stack.Navigator>
);

export default SearchStack;
