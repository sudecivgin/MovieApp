import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import MovieDetailScreen from '../../screens/HomeScreen/MovieDetailScreen';

export const HomeStackScreen = {
  Home: {
    screen: HomeScreen,
    title: 'Home',
    options: {},
    initialParams: {},
  },
  MovieDetail: {
    screen: MovieDetailScreen,
    title: 'Movie Detail',
    options: {},
    initialParams: { hideTabBar: true },
  },
} as const;
