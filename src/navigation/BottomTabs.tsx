import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import DownloadsScreen from '../screens/DownloadsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTabs: React.FC = () => {
      return (
        <Tab.Navigator
      initialRouteName="Home" 
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1e1e1e',
          borderTopWidth: 0,
          height: 60,
        },
        tabBarActiveTintColor: '#00bcd4',
        tabBarInactiveTintColor: '#aaa',
        tabBarIcon: ({ color, focused }) => {

          let iconName = '';

          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Search':
              iconName = 'search-outline';
              break;
            case 'Downloads':
              iconName = 'download-outline';
              break;
            case 'Profile':
              iconName = 'person-outline';
              break;
          }

          return (
            <View
              style={{
                backgroundColor: focused ? '#00bcd4' : 'transparent',
                padding: 8,
                borderRadius: 20,
              }}>

              <Ionicons name={iconName} size={22} color={focused ? '#000' : color} />
            </View>
          );
        },
      })} >

      <Tab.Screen name="Home" component={HomeScreen} />
      
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Downloads" component={DownloadsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
    
  );
};

export default BottomTabs;
