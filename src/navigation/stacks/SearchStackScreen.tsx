import SearchScreen from '../../screens/SearchScreen/SearchScreen';

export const SearchStackScreen = {
  Search: {
    screen: SearchScreen,
    options: { headerShown: false },

  },
} as const;