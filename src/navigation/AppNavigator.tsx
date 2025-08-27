import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Onboarding from '../components/Onboarding';

import LoginScreen from '../screens/LoginScreen/LoginScreen';
import LoginPage from '../screens/LoginScreen/LoginPage';
import SignUpScreen from '../screens/SignupScreen/SignUpScreen';
import ResetPasswordScreen from '../screens/PasswordScreen/ResetPasswordScreen';
import VerificationScreen from '../screens/PasswordScreen/VerificationScreen';
import CreatePassword from '../screens/PasswordScreen/CreatePassword';

import BottomTabs from './BottomTabs';

import EditProfileScreen from '../screens/ProfileMore/EditProfileScreen';
import Policies from '../screens/ProfileMore/Policies';
import Help from '../screens/ProfileMore/Help';
import MovieDetailScreen from '../screens/HomeScreen/MovieDetailScreen';
import WatchLater from '../screens/WatchLater/WatchLater';
import VipScreen from '../screens/ProfileMore/VipScreen';

import { AuthContext } from '../context/AuthContext';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

// 🔐 Giriş/kimlik ekranları (ilk ekran LoginPage)
const AuthStack = () => (
  <Stack.Navigator initialRouteName="LoginPage" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Onboarding" component={Onboarding} />
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="LoginPage" component={LoginPage} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    <Stack.Screen name="Verification" component={VerificationScreen} />
    <Stack.Screen name="CreatePassword" component={CreatePassword} />
  </Stack.Navigator>
);

// 📱 Uygulama içi ekranlar
const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainApp" component={BottomTabs} />
    {/* (İstersen LoginScreen’i buradan kaldırabilirsin; AuthStack’te zaten var) */}
    <Stack.Screen name="LoginScreen" component={LoginScreen} />

    <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />

    <Stack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{
        headerShown: true,
        title: 'Edit Profile',
        headerStyle: { backgroundColor: '#181818' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontFamily: 'serif' },
      }}
    />

    <Stack.Screen name="Policies" component={Policies} />
    <Stack.Screen name="Help" component={Help} />

    <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} />
    <Stack.Screen name="Vip" component={VipScreen} />

    <Stack.Screen
      name="WatchLater"
      component={WatchLater}
      options={{
        headerShown: true,
        title: 'Watch Later',
        headerStyle: { backgroundColor: '#181818' },
        headerTintColor: 'white',
        headerTitleStyle: { fontFamily: 'serif' },
      }}
    />
  </Stack.Navigator>
);

const AppNavigator: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext)!;

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;