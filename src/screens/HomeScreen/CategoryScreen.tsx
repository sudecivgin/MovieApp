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
} from 'react-native';
import { RouteProp } from '@react-navigation/native';

import { RootStackParamList } from '../../navigation/types';
import { TMDB_API_KEY } from '@env';

type Props = {
  route: RouteProp<RootStackParamList, 'MovieDetailScreen'>;
};

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieDetailScreen: React.FC<Props> = ({ route }) => {
  const { movieId } = route.params;

  const [movie, setMovie] = useState<any>(null);

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
          (video: any) => video.site === 'YouTube' && video.type === 'Trailer'
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
          onPress={() => Linking.openURL(trailerUrl)}
        >
          <Text style={styles.trailerButtonText}>🎬 Watch Trailer</Text>
        </TouchableOpacity>
      )}
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
    backgroundColor: '#00bcd4',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
      marginTop: 16,
    alignSelf: 'flex-start',
  },



  trailerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
      fontFamily: 'serif',
  },
});
