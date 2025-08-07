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
import CategoryScreen from '../screens/CategoryScreen';
import PopularScreen from '../screens/PopularScreen';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import BottomTabs from './BottomTabs';
import Policies from '../screens/ProfileMore/Policies'; 
import Help from '../screens/ProfileMore/Help';

import WatchLater from '../screens/WatchLater'; 

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
    <Stack.Screen name="Verification" component={VerificationScreen} />
    <Stack.Screen name="CategoryScreen" component={CategoryScreen} />

    <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} />
    <Stack.Screen name="CreatePassword" component={CreatePassword} />
    
        <Stack.Screen name="WatchLater" component={WatchLater} />

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
      })}
/>

    <Stack.Screen
      name="Popular"
      component={PopularScreen}
      options={{
        title: 'Popular Movies',
        headerStyle: { backgroundColor: '#181818' },
        headerTintColor: 'white',
        headerTitleStyle: { fontFamily: 'serif' },
      }}/>

    <Stack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{
        title: 'Edit Profile',
        headerStyle: { backgroundColor: '#181818' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontFamily: 'serif' },
      }}/>

    <Stack.Screen
      name="ResetPassword"
      component={ResetPasswordScreen}
      options={{
        title: 'Reset Password',
        headerShown: false,
      }} />

    <Stack.Screen
      name="Policies"

      component={Policies}

      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="Help"
      component={Help}
      options={{ headerShown: false }}/>

    <Stack.Screen
      name="MovieDetailScreen"
      component={MovieDetailScreen}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="CategoryScreen"
      component={CategoryScreen}
      options={({ route }) => ({
        title: `${route.params.genreName} Movies`,
        headerStyle: { backgroundColor: '#181818' },
        headerTintColor: 'white',
        headerTitleStyle: { fontFamily: 'serif' },
      })} />

    <Stack.Screen
      name="WatchLater" 
      component={WatchLater} 
      options={{
        title: '📌 Watch Later',
        headerStyle: { backgroundColor: '#181818' },
        headerTintColor: 'white',
        headerTitleStyle: { fontFamily: 'serif' },
      }}
    />
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
