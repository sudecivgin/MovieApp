import React, { useEffect, useState } from 'react';
import {
  Text,
  Image,
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  Linking,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';


import { RootStackParamList } from '../navigation/types';
import { TMDB_API_KEY } from '@env';

import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  route: RouteProp<RootStackParamList, 'MovieDetailScreen'>;
};

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
};

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieDetailScreen: React.FC<Props> = ({ route }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {

      
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`
        );
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    const fetchTrailer = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${TMDB_API_KEY}&language=en-US`
        );
        const data = await res.json();

        const trailer = data.results.find(
          (video: any) =>
            video.site === 'YouTube' &&

            (video.type === 'Trailer' || video.type === 'Teaser')
        );
        if (trailer) {
          setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
        }
      } catch (error) {
        console.error('Trailer fetch error:', error);
      }
    };

    fetchMovie();
    fetchTrailer();
  }, [movieId]);

  const addToWatchLater = async (movie: Movie) => {
    try {
      const json = await AsyncStorage.getItem('watchLater');

      const list: Movie[] = json ? JSON.parse(json) : [];

      const exists = list.find((m) => m.id === movie.id);

      if (!exists) {
        const updated = [...list, movie];
        await AsyncStorage.setItem('watchLater', JSON.stringify(updated));

    Alert.alert('Added', `"${movie.title}" added to Watch Later.`);
      } else {
        Alert.alert('Already Added', `"${movie.title}" is already in your Watch Later list.`);
      }
    } catch (e) {

      console.error('Failed to add to watch later:', e);
    }
  };

  if (!movie) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f5c518" />
        <Text style={{ color: 'white', marginTop: 10 }}>Loading...</Text>
      </View>
    );
  }
 return (
    <ScrollView contentContainerStyle={styles.scrollContent} style={styles.container}>
      <Image
        source={{ uri: `${IMAGE_URL}${movie.poster_path}` }}
        style={styles.poster}
      />
  <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.overview}>{movie.overview}</Text>
     <Text style={styles.rating}>⭐ {movie.vote_average}</Text>

  {trailerUrl && (
        <TouchableOpacity
          style={styles.trailerButton}
          onPress={() => Linking.openURL(trailerUrl!)}
 >
          <Text style={styles.trailerButtonText}>Watch Trailer</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.watchLaterButton}
        onPress={() => addToWatchLater(movie)}>
        <Text style={styles.watchLaterText}>📌 Add to Watch Later</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },


  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },

  poster: {
    width: '100%',
    height: 480,
    borderRadius: 10,
    marginTop: 40,
  },


  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 16,
    fontFamily: 'serif',
  },

  overview: {
    color: '#ccc',
    fontSize: 16,
    marginTop: 12,
    fontFamily: 'serif',
    lineHeight: 22,
    textAlign: 'justify',
  },


  rating: {
    color: '#f5c518',
    fontSize: 16,
    marginTop: 12,
    fontFamily: 'serif',
  },

  trailerButton: {
    backgroundColor: '#202425ff',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 16,
    width: '100%',
    alignSelf: 'center',
  },

  trailerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'serif',
    textAlign: 'center',
  },


  watchLaterButton: {
    backgroundColor: '#202425ff',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 16,
    width: '100%',
    alignSelf: 'center',
  },

  watchLaterText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'serif',
    textAlign: 'center',
  },
  
});
