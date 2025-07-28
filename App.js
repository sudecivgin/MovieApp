import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AppNavigator from './src/navigation/AppNavigator';


const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  return (
    
    <>
    
      <StatusBar barStyle="dark-content" backgroundColor="#212121" />
      
      <AppNavigator />
      
    </>
    
  );
};

export default App;
