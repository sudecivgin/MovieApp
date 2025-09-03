import ProfileScreen from '../../screens/ProfileMore/ProfileScreen';
import EditProfileScreen from '../../screens/ProfileMore/EditProfileScreen';
import Policies from '../../screens/ProfileMore/Policies';
import Help from '../../screens/ProfileMore/Help';
import VipScreen from '../../screens/ProfileMore/VipScreen';
import ResetPasswordScreen from '../../screens/PasswordScreen/ResetPasswordScreen';

export const ProfileStackScreen = {
  Profile: {
    screen: ProfileScreen,
    title: 'Profile',
    options: { headerShown: false },
  },
  ResetPassword: {
    screen: ResetPasswordScreen,
    title: 'Change Password',
    options: {
      headerShown: false,
      headerStyle: { backgroundColor: '#181818' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontFamily: 'serif' },
    },
  },
  EditProfile: {
    screen: EditProfileScreen,
    title: 'Edit Profile',
    options: {
      headerShown: true,
      title: 'Edit Profile',
      headerStyle: { backgroundColor: '#181818' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontFamily: 'serif' },
    },
  },
  Policies: { screen: Policies, title: 'Policies', options: { headerShown: false } },
  Help:     { screen: Help,     title: 'Help',     options: { headerShown: false } },
  Vip:      { screen: VipScreen, title: 'VIP',      options: { headerShown: false } },
} as const;