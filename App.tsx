import React, { useEffect } from 'react';
import { StatusBar, Platform, PermissionsAndroid } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import AppNavigator from './src/navigation/AppNavigator';
import AuthProvider from './src/context/AuthContext';

import './src/i18n';
import { initRemoteConfig, loadTranslationsFromRC } from './src/i18n/rcLoader';
import { LangProvider } from './src/i18n/LangProvider';

import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';

const App: React.FC = () => {
  useEffect(() => {
    (async () => {
      try {
        await initRemoteConfig();
        const load = loadTranslationsFromRC();
        await Promise.race([load, new Promise(r => setTimeout(r, 3000))]);
      } finally {
        SplashScreen.hide();
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {

      if (Platform.OS === 'android' && Platform.Version >= 33) {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
      }

      if (Platform.OS === 'android') {
        await notifee.createChannel({
          id: 'default',
          name: 'Genel',
          importance: AndroidImportance.HIGH,
        });
      }

      const token = await messaging().getToken();
      console.log('FCM TOKEN:', token);

      const unsubMsg = messaging().onMessage(async remoteMessage => {
        await notifee.displayNotification({
          title: remoteMessage?.notification?.title ?? 'Yeni mesaj',
          body:
            remoteMessage?.notification?.body ??
            (remoteMessage?.data ? JSON.stringify(remoteMessage.data) : 'Mesaj alındı'),
          android: { channelId: 'default' },
        });
      });

      
      const unsubTok = messaging().onTokenRefresh(newToken => {
        console.log('Yeni FCM token:', newToken);
      });

      return () => {
        unsubMsg();
        unsubTok();
      };
    })();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#212121" />
      <LangProvider>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </LangProvider>
    </>
  );
};

export default App;
