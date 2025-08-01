import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Onboarding from '../components/Onboarding';
import LoginScreen from '../screens/LoginScreen';

import LoginPage from '../screens/LoginPage';
import BottomTabs from './BottomTabs';

import SignUpScreen from '../screens/SignUpScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import VerificationScreen from '../screens/VerificationScreen';
import CreatePassword from '../screens/CreatePassword';
import CategoryScreen from '../screens/CategoryScreen'; 

import PopularScreen from '../screens/PopularScreen'; 

import { AuthContext } from '../context/AuthContext';
import { RootStackParamList } from './types';


const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Onboarding" component={Onboarding} />

    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="LoginPage" component={LoginPage} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />

    <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />

<Stack.Screen name="Popular" component={PopularScreen} />

    <Stack.Screen name="Verification" component={VerificationScreen} />
    <Stack.Screen name="CreatePassword" component={CreatePassword} />
    
  </Stack.Navigator>
);

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="MainApp"
      component={BottomTabs}
      options={{ headerShown: false }}/>


    <Stack.Screen
      name="Category"
      component={CategoryScreen}
      options={({ route }) => ({
        title: `${route.params.category} Movies`,
        headerStyle: { backgroundColor: '#181818' },
        headerTintColor: 'white',
        headerTitleStyle: { fontFamily: 'serif' },
      })} />

    <Stack.Screen
      name="Popular"
      component={PopularScreen}
      options={{
        title: 'Popular Movies',
        headerStyle: { backgroundColor: '#181818' },
        headerTintColor: 'white',
        headerTitleStyle: { fontFamily: 'serif' },
      }} />

  </Stack.Navigator>
);


const AppNavigator: React.FC = () => {

  const { isAuthenticated } = useContext(AuthContext)!;

  console.log('[NAVIGATION] Authenticated:', isAuthenticated);

  return (
    
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>

  );
};

export default AppNavigator;
