import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getWatchLater, removeFromWatchLater, Movie } from '../utils/WatchLaterStorage';

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const WatchLater = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const loadMovies = async () => {
    try {
      const saved = await getWatchLater();
      setMovies(saved);
    } catch (error) {
      console.error('Failed to load Watch Later list:', error);
    }
  };

  const handleRemove = async (id: number) => {
    await removeFromWatchLater(id);
    loadMovies();
  };

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>📌 Watch Later</Text>
      
      {movies.length === 0 ? (
        <Text style={styles.empty}>No movies added yet.</Text>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={{ uri: IMAGE_URL + item.poster_path }}
            style={styles.image}/>
              <View style={styles.info}>
                <Text style={styles.movieTitle}>{item.title}</Text>
                <Text style={styles.rating}>⭐ {item.vote_average.toFixed(1)}</Text>
                <TouchableOpacity onPress={() => handleRemove(item.id)}>
                  <Text style={styles.remove}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default WatchLater;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },


  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 24,
    fontFamily: 'serif',
  },


  empty: {
    color: '#888',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    fontFamily: 'serif',
  },


  card: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#1c1c1c',
    borderRadius: 10,
    overflow: 'hidden',
  },

  image: {
    width: 100,
    height: 150,
  },


  info: {
    marginLeft: 12,
    justifyContent: 'center',
    flex: 1,
    paddingRight: 8,
  },


  movieTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },


  rating: {
    color: '#f5c518',
    fontSize: 14,
    marginTop: 4,
    fontFamily: 'serif',
  },


  remove: {
    color: 'red',
    marginTop: 10,
    fontSize: 14,
    fontFamily: 'serif',
    
  },
});
