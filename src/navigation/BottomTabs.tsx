import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import WatchLater from '../screens/WatchLater';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabBarIcon = ({
  name,
  color,
  focused,
}: {
  name: string;
  color: string;
  focused: boolean;
}) => {
  const iconStyle = [
    styles.iconContainer,

    focused ? styles.iconFocused : styles.iconUnfocused,
  ];

  return (
    <View style={iconStyle}>
      <Ionicons name={name} size={22} color={focused ? '#000' : color} />
    </View>
  );
};


const getScreenOptions = ({ route }: { route: any }) => ({
  headerShown: false,
  tabBarStyle: {
    backgroundColor: '#1e1e1e',
    borderTopWidth: 0,
    height: 60,
  },
  tabBarActiveTintColor: '#00bcd4',
  tabBarInactiveTintColor: '#aaa',
  tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => {
    let iconName = '';

    switch (route.name) {

      case 'Home':
        iconName = 'home-outline';
        break;
      case 'Search':
        iconName = 'search-outline';
        break;
      case 'WatchLater':
        iconName = 'film-outline';
        break;
      case 'Profile':
        iconName = 'person-outline';
        break;

      default:
        iconName = 'ellipse-outline';
        break;
    }

    return <TabBarIcon name={iconName} color={color} focused={focused} />;
  },
});

const BottomTabs: React.FC = () => {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={getScreenOptions}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />

      <Tab.Screen name="WatchLater" component={WatchLater} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  iconContainer: {
    padding: 8,
    borderRadius: 20,
  },
  iconFocused: {
    backgroundColor: '#00bcd4',
  },
  iconUnfocused: {
    backgroundColor: 'transparent',
  },
});
