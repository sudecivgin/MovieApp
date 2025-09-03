import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';
import { ProfileStackScreen } from './ProfileStackScreen';

type ProfileStackParamList = Pick<
  RootStackParamList,
  'Profile' | 'EditProfile' | 'Policies' | 'Help' | 'Vip'
>;

const Stack = createNativeStackNavigator<ProfileStackParamList>();

type Entry = [
  keyof typeof ProfileStackScreen,
  (typeof ProfileStackScreen)[keyof typeof ProfileStackScreen]
];

const ProfileStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Profile"
    >
      {(Object.entries(ProfileStackScreen) as Entry[]).map(([name, cfg]) => (
        <Stack.Screen
          key={name}
          name={name as keyof ProfileStackParamList}
          component={cfg.screen as React.ComponentType<any>}
          options={cfg.options}
          {...(('initialParams' in cfg && (cfg as any).initialParams !== undefined)
            ? { initialParams: (cfg as any).initialParams }
            : {})}
        />
      ))}
    </Stack.Navigator>
  );
};

export default ProfileStack;