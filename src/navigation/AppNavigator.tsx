import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Onboarding from '../components/Onboarding';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import LoginPage from '../screens/LoginScreen/LoginPage';
import SignUpScreen from '../screens/SignupScreen/SignUpScreen';
import ResetPasswordScreen from '../screens/PasswordScreen/ResetPasswordScreen';
import VerificationScreen from '../screens/PasswordScreen/VerificationScreen';
import CreatePassword from '../screens/PasswordScreen/CreatePassword';

import AppStack from './AppStack'; 
import { AuthContext } from '../context/AuthContext';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack = ({ initialRoute }: { initialRoute: keyof RootStackParamList }) => (
  <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Onboarding" component={Onboarding} />
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="LoginPage" component={LoginPage} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    <Stack.Screen name="Verification" component={VerificationScreen} />
    <Stack.Screen name="CreatePassword" component={CreatePassword} />
  </Stack.Navigator>
);

const MainStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainApp" component={AppStack} />
  </Stack.Navigator>
);

const AppNavigator: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext)!;

  const [bootReady, setBootReady] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);
  const [forceOnboarding, setForceOnboarding] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const seen = await AsyncStorage.getItem('hasSeenOnboarding');
        setShowOnboarding(seen !== 'true');
      } finally {
        setBootReady(true);
      }
    })();
  }, []);

  useEffect(() => setForceOnboarding(!isAuthenticated), [isAuthenticated]);

  if (!bootReady || showOnboarding === null) return null;

  const initialAuthRoute: keyof RootStackParamList =
    forceOnboarding ? 'Onboarding' : showOnboarding ? 'Onboarding' : 'LoginPage';

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainStack /> : <AuthStack initialRoute={initialAuthRoute} />}
    </NavigationContainer>
  );
};

export default AppNavigator;
