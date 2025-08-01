import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import AppNavigator from './src/navigation/AppNavigator';
import AuthProvider from './src/context/AuthContext';



const App: React.FC = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#212121" />
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
      
    </>
  );
};

export default App;
