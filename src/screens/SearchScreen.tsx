import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { TMDB_API_KEY } from '@env';

import { getWatchLater } from '../utils/WatchLaterStorage';

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path?: string;
  vote_average: number;
  release_date: string;
  genre_ids?: number[];
  runtime?: number;
};

type Genre = {
  id: number;
  name: string;
};

const SearchScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [todayMovie, setTodayMovie] = useState<Movie | null>(null);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nowPlayingRes = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US`
        );
        const nowPlayingData = await nowPlayingRes.json();
        const firstMovie = nowPlayingData.results[0];

        const movieDetailsRes = await fetch(
          `https://api.themoviedb.org/3/movie/${firstMovie.id}?api_key=${TMDB_API_KEY}&language=en-US`
        );
        const movieDetails = await movieDetailsRes.json();

        setTodayMovie({ ...firstMovie, runtime: movieDetails.runtime });

        const genresRes = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`
        );
        const genresData = await genresRes.json();
        setGenres([{ id: -1, name: 'All' }, ...genresData.genres]);

        const watchLaterMovies = await getWatchLater();
        const genreCounts: { [key: number]: number } = {};


        watchLaterMovies.forEach((movie) => {
          movie.genre_ids?.forEach((id) => {

            if (id !== undefined && id !== null) {
              genreCounts[id] = (genreCounts[id] || 0) + 1;
            }
          });
        });

        const topGenres = Object.entries(genreCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 2)
          .map(([id]) => Number(id));

        const genreQuery = topGenres.join(',');

        const recRes = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&with_genres=${genreQuery}&sort_by=vote_average.desc&vote_count.gte=500`
        );
        const recData = await recRes.json();

        const watchLaterIds = new Set(watchLaterMovies.map((m) => m.id));
        const filteredRecs = recData.results.filter((m: Movie) => !watchLaterIds.has(m.id));

        setPopularMovies(filteredRecs.slice(0, 5));
      } catch (e) {
        console.error('TMDb API error:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getGenreNames = (ids: number[]) => {

    return genres.filter((g) => ids.includes(g.id)).map((g) => g.name).join(', ');
  };

  const renderHeader = () => (
    <View>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Type title, categories, years, etc..."
          placeholderTextColor="#aaa"
          style={styles.searchInput} />
      </View>


      <FlatList
        data={genres}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => navigation.navigate('CategoryScreen', { genreId: item.id, genreName: item.name })}>
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.categoryContainer}/>

      <Text style={styles.sectionTitle}>Today</Text>
      {todayMovie && (
        <View style={styles.todayContainer}>
          <Image source={{ uri: IMAGE_URL + todayMovie.poster_path }} style={styles.todayImage} />
          <View style={styles.todayInfo}>
            <Text style={styles.todayTitle}>{todayMovie.title}</Text>
            <Text style={{ color: '#f5c518', fontSize: 14 }}>⭐ {todayMovie.vote_average.toFixed(1)}</Text>
            <View style={styles.todayMeta}>

              <Text style={styles.metaText}>📅 {todayMovie.release_date.slice(0, 4)}</Text>
              <Text style={styles.metaText}>⌚ {todayMovie.runtime} min</Text>
              <Text style={styles.metaText}>🎬 {getGenreNames(todayMovie.genre_ids || [])}</Text>
            </View>

          </View>
        </View>
      )}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recommend for you</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={popularMovies}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.movieCard}>
            <Image source={{ uri: IMAGE_URL + item.poster_path }} style={styles.movieImage} />
            <Text style={styles.movieTitle}>{item.title}</Text>
            <Text style={styles.movieRating}>⭐ {item.vote_average.toFixed(1)}</Text>
          </View>

        )}
        showsHorizontalScrollIndicator={false}/>
    </View>
  );

  if (loading) {

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#181818' }}>
        <ActivityIndicator size="large" color="#00bcd4" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#181818' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined} >
      <FlatList
        data={[]}
        renderItem={() => null}

        ListHeaderComponent={renderHeader}
        contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </KeyboardAvoidingView>
  );
};

export default SearchScreen;


const styles = StyleSheet.create({
  searchContainer: {
    marginTop: 60,
    backgroundColor: '#2b2b2bff',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },

  searchInput: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'serif',
  },

  categoryContainer: {
    marginBottom: 20,
    marginTop: 30,
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
    fontFamily:'serif',
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
  todayContainer: {
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 30,
  },
  todayImage: {
    width: 130,
    height: 190,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  todayInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-around',
  },
  todayTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'serif',
    marginBottom: 4,
  },
  todayMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  metaText: {
    color: '#ccc',
    fontSize: 12,
    marginRight: 10,
  },
});
