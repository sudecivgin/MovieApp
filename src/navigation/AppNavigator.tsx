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

import { AuthContext } from '../context/AuthContext';
import { RootStackParamList } from './types';
import VipScreen from '../screens/ProfileMore/VipScreen';


const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Onboarding" component={Onboarding} />
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="LoginPage" component={LoginPage} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    <Stack.Screen name="Verification" component={VerificationScreen} />
    <Stack.Screen name="CreatePassword" component={CreatePassword} />
  </Stack.Navigator>
);

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="MainApp" component={BottomTabs} options={{ headerShown: false }} />
<Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />

<Stack.Screen
  name="ResetPassword"
  component={ResetPasswordScreen}
  options={{ headerShown: false }} />

    <Stack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{
        title: 'Edit Profile',
        headerStyle: { backgroundColor: '#181818' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontFamily: 'serif' },}}/>

    <Stack.Screen name="Policies" component={Policies} options={{ headerShown: false }} />
    <Stack.Screen name="Help" component={Help} options={{ headerShown: false }} />

    <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} options={{ headerShown: false }} />
<Stack.Screen
  name="Vip"
  component={VipScreen}
  options={{ headerShown: false }}  
/>
    <Stack.Screen
      name="WatchLater"
      component={WatchLater}
      options={{
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
