// src/screens/HomeScreen/HomeScreen.tsx
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
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { TMDB_API_KEY } from '@env';



type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

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

type Genre = {
  id: number;
  name: string;
};

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        
        // Vizyondaki filmleri çek
        const nowPlayingResponse = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`
        );
        const nowPlayingData = await nowPlayingResponse.json();
        setNowPlaying(nowPlayingData.results);

        // Film türlerini çek
        const genresResponse = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`
        );
        const genresData = await genresResponse.json();
        
        // Tüm filmler ve diğer kategorileri ekle
        const allGenres = [
          { id: null, name: 'All' },
          ...genresData.genres,
          { id: -1, name: 'Popular' }
        ];
        setGenres(allGenres);

        // Başlangıçta popüler filmleri yükle
        const popularResponse = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`
        );
        const popularData = await popularResponse.json();
        setFilteredMovies(popularData.results);

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

        if (selectedCategory === null) {
          // Tüm filmler
          url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`;
        } else if (selectedCategory === -1) {
          // Popüler filmler
          url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`;
        } else {
          // Belirli bir türe göre filmler
          url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${selectedCategory}&language=en-US&page=1`;
        }

        const response = await fetch(url);
        const json = await response.json();
        setFilteredMovies(json.results);
      } catch (error) {
        console.error('Filming error by category:', error);
      }
    };

    fetchMoviesByCategory();
  }, [selectedCategory]);

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
        />
      </View>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
      >
        {nowPlaying.map((movie) => (
          <TouchableOpacity
            key={movie.id}
            onPress={() => navigation.navigate('MovieDetailScreen', { movieId: movie.id })}
            style={styles.carouselItem}
          >
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`,
              }}
              style={styles.featuredImage}
            />
<Text style={styles.featuredTitle}>{movie.title}</Text>
{movie.release_date && (
  <Text style={styles.featuredReleaseDate}>
    {new Date(movie.release_date).getFullYear()}
  </Text>
)}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.category}>CATEGORY</Text>
      {loading ? (
        <ActivityIndicator size="small" color="#00bcd4" />
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
          {genres.map((genre, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryButton,
                selectedCategory === genre.id && { backgroundColor: '#00bcd4' },
              ]}
              onPress={() => setSelectedCategory(genre.id)}
            >
              <Text style={styles.categoryText}>{genre.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          {selectedCategory === null ? 'ALL MOVIES' : 
           selectedCategory === -1 ? 'MOST POPULAR' : 
           genres.find(g => g.id === selectedCategory)?.name?.toUpperCase() + ' MOVIES'}
        </Text>
        <TouchableOpacity
  onPress={() => {
    const genre = genres.find(g => g.id === selectedCategory);
    if (genre) {
      navigation.navigate('CategoryScreen', {
        genreId: genre.id ?? 0,
        genreName: genre.name,
        initialMovies: filteredMovies, // 👈 burası önemli
      });
    }
  }}
>
  <Text style={styles.seeAll}>See All</Text>
</TouchableOpacity>


      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00bcd4" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#000' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={{ backgroundColor: '#181818' }}
        contentContainerStyle={{
          paddingBottom: 40,
          paddingHorizontal: 20,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {renderHeader()}

        {filteredMovies.length === 0 ? (
          <Text style={styles.noMoviesText}>No movies found in this category.
</Text>
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
    marginTop: 20,
    fontSize: 16,
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


  carouselItem: {
    width: 300,
    marginRight: 16,
  },


  featuredImage: {
    width: '100%',
    height: 160,
    borderRadius: 12,

  },

  featuredTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },

  category: {
    fontFamily: 'serif',
    color: '#fff',
    marginBottom: 20,
    marginTop: 20,
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


  featuredReleaseDate: {
  color: '#ccc',
  fontSize: 13,
  marginTop: 2,
  fontFamily: 'serif',
},


});

export default HomeScreen;