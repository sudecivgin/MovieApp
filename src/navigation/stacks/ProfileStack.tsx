import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';
import { ProfileStackScreen } from './ProfileStackScreen';

type ProfileStackParamList = Pick<
  RootStackParamList,
  'Profile' | 'ResetPassword' | 'EditProfile' | 'Policies' | 'Help' | 'Vip'
>;

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStack = () => (
  <Stack.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
    {Object.entries(ProfileStackScreen).map(([name, cfg]) => (
      <Stack.Screen
        key={name}
        name={name as keyof ProfileStackParamList}
        component={cfg.screen as React.ComponentType<any>}
        options={cfg.options}
      />
    ))}
  </Stack.Navigator>
);

export default ProfileStack;