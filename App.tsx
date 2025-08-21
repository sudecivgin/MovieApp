import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import AppNavigator from './src/navigation/AppNavigator';
import AuthProvider from './src/context/AuthContext';

import './src/i18n';
import { initRemoteConfig, loadTranslationsFromRC } from './src/i18n/rcLoader';

const App: React.FC = () => {
  useEffect(() => {
    (async () => {
      try {
        await initRemoteConfig();
        // RC yüklemesi (cihaz diline göre)
        const load = loadTranslationsFromRC();

        // En fazla 3 sn bekle; daha erken biterse erken kapat
        await Promise.race([
          load,
          new Promise((resolve) => setTimeout(resolve, 3000)),
        ]);
      } catch (e) {
        if (__DEV__) console.warn('Remote Config load error:', e);
      } finally {
        SplashScreen.hide();
      }
    })();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#212121" />
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </>
  );
};

export default App;
