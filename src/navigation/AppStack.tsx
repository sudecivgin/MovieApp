import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppStackScreens } from './AppStackScreens';

const Tab = createBottomTabNavigator();

const AppStack: React.FC = () => {
  const screens = AppStackScreens();
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: { backgroundColor: '#1e1e1e', borderTopWidth: 0, height: 54 },
        tabBarActiveTintColor: '#00bcd4',
        tabBarInactiveTintColor: '#aaa',
      }}
    >
      {Object.entries(screens).map(([name, cfg]) => {
        if (!cfg || cfg.initialParams?.disabled) return null;
        const label = cfg.initialParams?.tabBarName ?? String(name).replace('Stack', '');
        const active = cfg.initialParams?.activeTabBarIcon;
        const passive = cfg.initialParams?.passiveTabBarIcon;

        return (
          <Tab.Screen
            key={name}
            name={name}
            component={cfg.screen}
            options={{
              ...(cfg.options || {}),
              tabBarLabel: label,
              tabBarIcon: ({ focused, color, size }) =>
                (focused ? active : passive)?.({ color, size }) ?? null,
            }}
            {...(cfg.initialParams !== undefined ? { initialParams: cfg.initialParams } : {})}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default AppStack;
