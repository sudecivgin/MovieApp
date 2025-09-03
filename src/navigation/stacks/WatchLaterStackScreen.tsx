// navigation/stacks/WatchLaterStackScreen.ts
import WatchLater from '../../screens/WatchLater/WatchLater';

export const WatchLaterStackScreen = {
  WatchLaterMain: {
    screen: WatchLater,
    title: 'Watch Later',
    options: {
      headerShown: true,
      title: 'Watch Later',
      headerStyle: { backgroundColor: '#181818' },
      headerTintColor: 'white',
      headerTitleStyle: { fontFamily: 'serif' },
    },
    initialParams: { showOnTabBar: true },
  },
};
