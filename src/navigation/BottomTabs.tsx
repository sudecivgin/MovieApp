import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet,} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const iconStyle = [styles.iconContainer, focused ? styles.iconFocused : styles.iconUnfocused];
  return (
    <View style={iconStyle}>
      <Ionicons name={name} size={22} color={focused ? '#000' : color} />
    </View>
  );
};

const BottomTabs: React.FC = () => {
  const insets = useSafeAreaInsets();

  const screenOptions = ({ route }: { route: any }) => ({
    headerShown: false,
    tabBarHideOnKeyboard: true,
    tabBarStyle: {
      backgroundColor: '#1e1e1e',
      borderTopWidth: 0,
        height: 54 + insets.bottom / 1, 
      paddingBottom: Math.max(insets.bottom, 3),
      paddingTop: 6,
    },
    tabBarItemStyle: {
      minWidth: 64,
      paddingHorizontal: 0,
    },
    tabBarLabelStyle: {
      fontSize: 11,
        fontFamily: 'serif',
        marginTop:4,
      
    },
    tabBarActiveTintColor: '#00bcd4',
    tabBarInactiveTintColor: '#aaa',
    tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => {
      let iconName = 'ellipse-outline';
      switch (route.name) {
        case 'Home':
          iconName = 'home-outline'; break;
        case 'Search':
          iconName = 'search-outline'; break;
        case 'WatchLater':
          iconName = 'film-outline'; break;
        case 'Profile':
          iconName = 'person-outline'; break;
      }
      return <TabBarIcon name={iconName} color={color} focused={focused} />;
    },
  });

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen
        name="WatchLater"
        component={WatchLater}
        options={{
          tabBarLabel: 'Watch', // UZUN LABELI KISALT
        }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  iconContainer: {
    padding: 3,        
    borderRadius: 16,
  },
  iconFocused: { 
    backgroundColor: '#00bcd4'
   },
  iconUnfocused: {
  backgroundColor: 'transparent'
     },
});
