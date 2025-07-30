import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Onboarding from '../components/Onboarding';
import LoginScreen from '../screens/LoginScreen';
import LoginPage from '../screens/LoginPage';
import SignUpScreen from '../screens/SignUpScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import VerificationScreen from '../screens/VerificationScreen';

import CreatePassword from '../screens/CreatePassword';

import HomeScreen from '../screens/HomeScreen'; 
import { AuthContext } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

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
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
);

const AppNavigator = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
