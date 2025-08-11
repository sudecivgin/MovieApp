
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ImageSourcePropType,
  ActivityIndicator,
  Dimensions,
  Animated,
} from 'react-native';
import { RootStackParamList } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TMDB_API_KEY } from '@env';

const avatar: ImageSourcePropType = require('../../assets/AvatarHome.png');

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  genre_ids?: number[];
  release_date?: string;
};

type Genre = { id: number | null; name: string };

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const OUTER_PADDING = 20;
const { width } = Dimensions.get('window');
const LAYOUT_WIDTH = width - OUTER_PADDING * 2;
const ITEM_WIDTH = Math.round(LAYOUT_WIDTH * 0.8);
const SPACER = (LAYOUT_WIDTH - ITEM_WIDTH) / 2;


const capWords = (s: string) =>
  s
    ? s
        .split(' ')
        .map(w => (w ? w[0].toUpperCase() + w.slice(1).toLowerCase() : ''))
        .join(' ')
    : '';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const scrollX = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);

        const nowPlayingResponse = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`
        );
        const nowPlayingData = await nowPlayingResponse.json();
        setNowPlaying(nowPlayingData.results || []);

        const genresResponse = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`
        );
        const genresData = await genresResponse.json();
        const allGenres: Genre[] = [
          { id: null, name: 'All' },
          ...(genresData.genres || []),
          { id: -1, name: 'Popular' },
        ];
        setGenres(allGenres);

        const popularResponse = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`
        );

        const popularData = await popularResponse.json();
        setFilteredMovies(popularData.results || []);
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchMoviesByCategory = async () => {
      try {
        let url = '';
        if (selectedCategory === null || selectedCategory === -1) {
          url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`;
        } else {
          url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${selectedCategory}&language=en-US&page=1`;
        }

        const response = await fetch(url);
        const json = await response.json();
        setFilteredMovies(json.results || []);
      } catch (error) {

        console.error('Filming error by category:', error);
      }
    };

    fetchMoviesByCategory();
  }, [selectedCategory]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await res.json();
      setFilteredMovies(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderHeader = () => (
    <View>
      <View style={styles.header}>
        <Image source={avatar} style={styles.avatar} />
        <View style={styles.textContainer}>
          <Text style={styles.helloText}>Hello!</Text>
          <Text style={styles.subtitle}>Let’s stream your favorite movie</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search a title..."
          placeholderTextColor="#aaa"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"/>

      </View>

      <Animated.FlatList
        data={nowPlaying}
     keyExtractor={(it) => String(it.id)}
     horizontal
     showsHorizontalScrollIndicator={false}
        bounces={false}
        decelerationRate="fast"
        snapToInterval={ITEM_WIDTH}
        snapToAlignment="start"
        contentContainerStyle={[styles.carousel, { paddingHorizontal: SPACER }]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
            (index + 1) * ITEM_WIDTH,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1, 0.9],
            extrapolate: 'clamp',
          });

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [6, -6, 6],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1, 0.9],
            extrapolate: 'clamp',
          });

          return (
            <View style={{ width: ITEM_WIDTH }}>
              <Animated.View
                style={[
                  styles.featuredCard,
                  { transform: [{ scale }, { translateY }], opacity },
                ]}>

                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => navigation.navigate('MovieDetailScreen', { movieId: item.id })}
                  style={{ flex: 1 }}>
                  <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path || item.poster_path}` }}
                    style={styles.featuredImage}
                  />
                  <View style={styles.featuredOverlay}>
                    <Text style={styles.featuredTitle} numberOfLines={1}>
                      {item.title}
                    </Text>
                    {!!item.release_date && (
                      <Text style={styles.featuredReleaseDate}>
                        {new Date(item.release_date).getFullYear()}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              </Animated.View>
            </View>
          );
        }}
      />

      <Text style={styles.category}>Category</Text>
      {loading ? (
        <ActivityIndicator size="small" color="#00bcd4" />
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
          {genres.map((genre, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.categoryButton, selectedCategory === genre.id && { backgroundColor: '#00bcd4' }]}
              onPress={() => setSelectedCategory(genre.id)}
            >
              <Text style={styles.categoryText}>{genre.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          {selectedCategory === null
            ? 'All Movies'
            : selectedCategory === -1
            ? 'Most Popular'
            : `${capWords(genres.find(g => g.id === selectedCategory)?.name || '')} Movies`}
        </Text>
        <TouchableOpacity
          onPress={() => {
            const genre = genres.find((g) => g.id === selectedCategory);
            if (genre) {
              navigation.navigate('CategoryScreen', {
                genreId: genre.id ?? 0,
                genreName: genre.name,
                initialMovies: filteredMovies,
              });
            }
          }}>

          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#000' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={{ backgroundColor: '#181818' }}
        contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: OUTER_PADDING }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {renderHeader()}

        {filteredMovies.length === 0 ? (
          <Text style={styles.noMoviesText}>No movies found in this category.</Text>
        ) : (
          <FlatList
            data={filteredMovies}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('MovieDetailScreen', { movieId: item.id })}
                style={[styles.movieCard, index === 0 && { marginLeft: 0 }]}
              >
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                  style={styles.movieImage}
                />
                <Text style={styles.movieTitle}>{item.title}</Text>
                <Text style={styles.movieRating}>⭐ {item.vote_average.toFixed(1)}</Text>
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#181818',
  },
  noMoviesText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    fontFamily: 'serif',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 70,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    marginTop: 10,
  },
  textContainer: {
    flex: 1,
    marginTop: 10,
  },
  helloText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'serif',
  },
  subtitle: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 4,
    fontFamily: 'serif',
  },

  searchContainer: {
    marginTop: 40,
    backgroundColor: '#2b2b2bff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'serif',
  },

  carousel: {
    marginTop: 30,
    marginBottom: 20,
  },
  featuredCard: {
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#1e1e1e',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 8 },
      },
      android: { elevation: 8 },
    }),
  },
  featuredImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  featuredOverlay: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
  },
  featuredTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    fontFamily: 'serif',
  },
  featuredReleaseDate: {
    color: '#ccc',
    fontSize: 13,
    marginTop: 2,
    fontFamily: 'serif',
  },

  category: {
    fontFamily: 'serif',
    color: '#fff',
    marginBottom: 20,
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 17,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    height: 32,
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    minWidth: 100,
  },
  categoryText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'serif',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'serif',
    marginBottom: 20,
    marginTop: 20,
  },
  seeAll: {
    color: '#00bcd4',
    fontSize: 14,
    fontFamily: 'serif',
  },

  movieCard: {
    marginRight: 16,
    width: 120,
  },
  movieImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },
  movieTitle: {
    color: 'white',
    marginTop: 8,
    marginBottom: 5,
    fontSize: 14,
    fontFamily: 'serif',
  },
  movieRating: {
    color: '#f5c518',
    fontSize: 12,
  },
});

export default HomeScreen;
