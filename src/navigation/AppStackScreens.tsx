import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeStack from './stacks/HomeStack';
import SearchStack from './stacks/SearchStack';
import WatchLaterStack from './stacks/WatchLaterStack';
import ProfileStack from './stacks/ProfileStack';

const i = (name: string) =>
  ({ color, size }: { color: string; size: number }) =>
    <Ionicons name={name} size={size ?? 22} color={color} />;

export const AppStackScreens = () => ({
  HomeStack: {
    screen: HomeStack,
    options: {},
    initialParams: {
      disabled: false,
      showOnTabBar: true,
      tabBarName: 'Home',
      activeTabBarIcon: i('home'),
      passiveTabBarIcon: i('home-outline'),
    },
  },
  SearchStack: {
    screen: SearchStack,
    options: {},
    initialParams: {
      disabled: false,
      showOnTabBar: true,
      tabBarName: 'Search',
      activeTabBarIcon: i('search'),        
      passiveTabBarIcon: i('search-outline')
    },
  },

  WatchLaterStack: {
    screen: WatchLaterStack,
    options: {},
    initialParams: {
      disabled: false,
      showOnTabBar: true,
      tabBarName: 'Watch',
      activeTabBarIcon: i('film'),
      passiveTabBarIcon: i('film-outline'),
    },
  },
  
  ProfileStack: {
    screen: ProfileStack,
    options: {},
    initialParams: {
      disabled: false,
      showOnTabBar: true,
      tabBarName: 'Profile',
      activeTabBarIcon: i('person'),
      passiveTabBarIcon: i('person-outline'),
    },
  },
} as const);
