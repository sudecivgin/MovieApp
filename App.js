import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar, Alert } from 'react-native'; 
import SplashScreen from 'react-native-splash-screen';
import Onboarding from './components/Onboarding'; 
import Paginator from './components/Paginator';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  const handleNext = () => {
    Alert.alert('Next button pressed!');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Onboarding style={styles.onboarding} />
      <Paginator onNextPress={handleNext} style={styles.paginator} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  onboarding: {
    flex: 1,
  },
  paginator: {
    position: 'absolute',
    bottom: 30,        
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

