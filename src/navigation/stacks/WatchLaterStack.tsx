import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WatchLaterStackScreen } from './WatchLaterStackScreen';

const Stack = createNativeStackNavigator();

const WatchLaterStack = ({ route }: any) => {
  const initial = route?.params?.initialStackRoute ?? 'WatchLaterMain';
  return (
    <Stack.Navigator
      initialRouteName={initial}
      screenOptions={{ headerShown: false }} 
    >
      {Object.entries(WatchLaterStackScreen).map(([name, def]: any) => (
        <Stack.Screen
          key={name}
          name={name}
          component={def.screen}
          options={def.options}
          {...(def.initialParams !== undefined ? { initialParams: def.initialParams } : {})}
        />
      ))}
    </Stack.Navigator>
  );
};

export default WatchLaterStack;
