import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  Platform,
  Alert,

} from 'react-native';

import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TMDB_API_KEY } from '@env';
import LinearGradient from 'react-native-linear-gradient';

import { RootStackParamList } from '../navigation/types';

const BLUR = Platform.select({ ios: 40, android: 25 }) as number;

type Props = { route: RouteProp<RootStackParamList, 'MovieDetailScreen'> };

type TmdbGenre = { id: number; name: string };

type TmdbVideo = { key: string; site: 'YouTube' | string; type: string; official: boolean };
type TmdbCast = { id: number; name: string; character: string; profile_path: string | null };

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  overview: string;
  release_date: string;
  runtime: number | null;
  genres: TmdbGenre[];
  videos?: { results: TmdbVideo[] };
  credits?: { cast: TmdbCast[] };
};

const IMG = {
  w500: 'https://image.tmdb.org/t/p/w500',
  w185: 'https://image.tmdb.org/t/p/w185',
};

const MovieDetailScreen: React.FC<Props> = ({ route }) => {
  const { movieId } = route.params;
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [isFav, setIsFav] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let alive = true;
    const run = async () => {
      setLoading(true);
      setErr(null);
      try {
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=videos,credits,release_dates`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`TMDB ${res.status}`);
        const data: Movie = await res.json();
        if (alive) setMovie(data);
      } catch (e: any) {
        if (alive) setErr(e?.message ?? 'Unknown error');
      } finally {
        if (alive) setLoading(false);
      }
    };
    run();
    return () => {
      alive = false;
    };
  }, [movieId]);

  const year = useMemo(() => (movie?.release_date ? movie.release_date.slice(0, 4) : '—'), [movie]);
  const runtimeText = useMemo(() => (movie?.runtime ? `${movie.runtime} Minutes` : 'N/A'), [movie]);
  const firstGenre = useMemo(() => movie?.genres?.[0]?.name ?? '—', [movie]);

  const trailerUrl = useMemo(() => {
    const v = movie?.videos?.results?.find(
      x => x.site === 'YouTube' && (x.type === 'Trailer' || x.type === 'Teaser') && x.official,
    );
    return v ? `https://www.youtube.com/watch?v=${v.key}` : null;
  }, [movie]);

  const openTrailer = useCallback(() => {
    if (!trailerUrl) {
      Alert.alert('Trailer not found', 'This movie has no official trailer on YouTube.');
      return;
    }
    Linking.openURL(trailerUrl);
  }, [trailerUrl]);

  const addToWatchLater = useCallback(async () => {
    if (!movie) return;
    try {
      const json = await AsyncStorage.getItem('watchLater');

      const list: Movie[] = json ? JSON.parse(json) : [];
      const exists = list.some(m => m.id === movie.id);
      if (exists) {
        Alert.alert('Already Added', `"${movie.title}" is already in your Watch Later list.`);
        return;
      }
      const updated = [
        ...list,
        { id: movie.id, title: movie.title, poster_path: movie.poster_path, vote_average: movie.vote_average, overview: movie.overview } as Movie,
      ];
      await AsyncStorage.setItem('watchLater', JSON.stringify(updated));
      Alert.alert('Added', `"${movie.title}" added to Watch Later.`);
    } catch {
      Alert.alert('Error', 'Failed to update Watch Later.');
    }
  }, [movie]);

  const toggleFav = useCallback(async () => {
    if (!movie) return;
    try {
      const json = await AsyncStorage.getItem('favorites');
      const list: number[] = json ? JSON.parse(json) : [];
      let updated: number[];
      if (list.includes(movie.id)) {
        updated = list.filter(id => id !== movie.id);
        setIsFav(false);
      } else {
        updated = [...list, movie.id];
        setIsFav(true);
      }
      await AsyncStorage.setItem('favorites', JSON.stringify(updated));
    } catch {
      Alert.alert('Error', 'Failed to update favorites.');
    }
  }, [movie]);

  useEffect(() => {
    (async () => {
      if (!movie) return;
      const json = await AsyncStorage.getItem('favorites');
      const list: number[] = json ? JSON.parse(json) : [];
      setIsFav(list.includes(movie.id));
    })();
  }, [movie]);

  const bgUri = useMemo(() => {
    if (movie?.backdrop_path) return `${IMG.w500}${movie.backdrop_path}`;

    if (movie?.poster_path) return `${IMG.w500}${movie.poster_path}`;
    return null;
  }, [movie]);

  if (loading) {

    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f5c518" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (err || !movie) {
    return (
 <View style={styles.loadingContainer}>
    <Ionicons name="alert-circle" size={28} color="#f66" />
        <Text style={[styles.loadingText, { marginTop: 8 }]}>{err ? `Error: ${err}` : 'Movie not found'}</Text>
        <TouchableOpacity onPress={() => nav.goBack()} style={[styles.chip, { marginTop: 16 }]}>
          <Text style={styles.chipText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {bgUri && (
        <>
          <Image source={{ uri: bgUri }} style={styles.bgImage} blurRadius={BLUR} resizeMode="cover" />

          <LinearGradient
            pointerEvents="none"
            colors={['rgba(11,13,16,0.75)', 'rgba(11,13,16,0.35)', 'rgba(11,13,16,0.00)']}
            locations={[0, 0.4, 1]}
            style={styles.gradientTop}/>

          <LinearGradient
            pointerEvents="none"
            colors={['rgba(11,13,16,0.00)', 'rgba(11,13,16,0.45)', 'rgba(11,13,16,0.85)']}
            locations={[0, 0.55, 1]}
            style={styles.gradientBottom}
          />
        </>
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => nav.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>


<Text style={styles.headerTitle} numberOfLines={1}>
  {movie.title}
</Text>

      <TouchableOpacity style={styles.heartButton} onPress={toggleFav}>
        <Ionicons name={isFav ? 'heart' : 'heart-outline'} size={24} color={isFav ? '#ff5b77' : '#fff'} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scroll}>

        <Image
          source={{
            uri: movie.poster_path ? `${IMG.w500}${movie.poster_path}` : `https://placehold.co/500x750?text=${encodeURIComponent(movie.title)}`,
          }}
          style={styles.poster}/>

        <View style={styles.metaRow}>

          <Text style={styles.metaText}>{year}</Text>
          <View style={styles.dot} />
          <Text style={styles.metaText}>{runtimeText}</Text>
          <View style={styles.dot} />
          <Text style={styles.metaText}>{firstGenre}</Text>
        </View>

        <View style={styles.ratingRow}>
          <Ionicons name="star" size={16} color="#f5c518" />
          <Text style={styles.ratingText}>{movie.vote_average?.toFixed(1)}</Text>
        </View>

        <View style={styles.primaryActions}>
          <TouchableOpacity style={styles.playBtn} onPress={openTrailer}>
            <Ionicons name="play" size={18} color="#000" />
            <Text style={styles.playText}>Play</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.circleBtn} onPress={addToWatchLater}>
            <Ionicons name="bookmark" size={18} color="#fff" />
          </TouchableOpacity>

          {trailerUrl && (
            <TouchableOpacity style={styles.circleBtn} onPress={openTrailer}>
              <Ionicons name="logo-youtube" size={18} color="#fff" />
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.sectionTitle}>Story Line</Text>
        <Text style={styles.overview} numberOfLines={expanded ? 0 : 4}>
          {movie.overview || 'No overview provided.'}
        </Text>

        {movie.overview && movie.overview.length > 180 && (
          <TouchableOpacity onPress={() => setExpanded(v => !v)}>
            <Text style={styles.more}>{expanded ? 'Less' : 'More'}</Text>
          </TouchableOpacity>
        )}

        {!!movie.credits?.cast?.length && (
          < >
            <Text style={[styles.sectionTitle, { marginTop: 12 }]}>Cast and Crew</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.castRow}>
              {movie.credits!.cast.slice(0, 10).map(person => (
                <View key={person.id} style={styles.castCard}>
                 <Image
                    source={{
                      uri: person.profile_path ? `${IMG.w185}${person.profile_path}` : 'https://placehold.co/148x222?text=No+Image',
                    }}
                    style={styles.castImg}
                  />
                  <Text style={styles.castName} numberOfLines={1}>{person.name}</Text>
                  <Text style={styles.castChar} numberOfLines={1}>{person.character}</Text>
                </View>
              ))}
            </ScrollView>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({
  container: {
     flex: 1,
      backgroundColor: '#0b0d10'
     },
  scroll: {
     padding: 16,
      paddingBottom: 32
     },
  loadingContainer: {
     flex: 1,
      justifyContent: 'center',
       alignItems: 'center',
        backgroundColor: '#0b0d10'
       },
  loadingText: { 
    color: '#fff',
     marginTop: 10 
    },
  backButton: {
     position: 'absolute',
      top: 50,
       left: 20, 
      zIndex: 50, 
      padding: 8, 
      borderRadius: 20 
    },
  heartButton: {
     position: 'absolute', 
     top: 50, 
     right: 20, 
     zIndex: 50, 
     padding: 8,
      borderRadius: 20 
    },

  poster: {
    width: '100%',
    height: 480,
    borderRadius: 12,
    marginTop: 80,
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },

  headerTitle: {
  position: 'absolute',
  top: 50, 
  left: 0,
  right: 0,
  textAlign: 'center',
  color: '#fff',
  fontSize: 20,
  fontWeight: '700',
  fontFamily: 'serif',
  textShadowColor: 'rgba(0,0,0,0.6)',
  textShadowOffset: { width: 0, height: 1 },
  textShadowRadius: 3,
  paddingHorizontal: 60, 
},


  metaRow: { 
    flexDirection: 'row',
     alignItems: 'center', 
     marginTop: 15, 
     justifyContent: 'center' 
    },

  metaText: {
     color: '#b8c0cc',
      fontSize: 13,
       fontFamily: 'serif' 
      },

  dot: {
     width: 4, 
    height: 4, 
    borderRadius: 2, 
    backgroundColor: '#3a3f46',
     marginHorizontal: 8 
    },

  ratingRow: {
     flexDirection: 'row',
      alignItems: 'center',
       marginTop: 10, 
       justifyContent: 'center', 
       gap: 6 
      },
  ratingText: { 
    color: '#f5c518',
    fontSize: 16, 
    fontFamily: 'serif',
   },

  primaryActions: { 
    flexDirection: 'row',
     alignItems: 'center',
      gap: 12,
       marginTop: 16,
       justifyContent: 'center' 
      
      },

  playBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#f5a623',
    paddingVertical: 10,
    borderRadius: 24,
    paddingHorizontal: 22,
  },

  playText: { color: '#000',
     fontWeight: '700',
     fontFamily:'serif',
     },

  circleBtn: {
     width: 42, 
     height: 42, 
     borderRadius: 21, 
     alignItems: 'center', 
     justifyContent: 'center',
      backgroundColor: '#202425'
  
    },
  sectionTitle: {
     color: '#fff',
      fontSize: 18,
       fontWeight: '700', 
       marginTop: 30, 
       fontFamily: 'serif' 
      },

  overview: { 
    color: '#cfd6e1', 
    fontSize: 15, marginTop: 12,
     lineHeight: 22,
     textAlign: 'justify', 
     fontFamily: 'serif' },

  more: { 
    color: '#8ab4ff', 
    marginTop: 6,
     marginBottom:15,
      fontWeight: '600' ,
      fontFamily:'serif',
    },

  castRow: { 
    paddingVertical: 8,
     marginTop:15,
    },
  castCard: { 
    width: 120, 
    marginRight: 10 
  },

  castImg: {
     width: 120, 
     height: 170, 
     borderRadius: 20, 
     backgroundColor: '#1a1e24' 
    },

  castName: {

     color: '#fff', 
     fontFamily:'serif',
     fontSize: 13,
      marginTop: 6 
    },
  castChar: {
     fontFamily:'serif',

     color: '#98a1ad',
      fontSize: 11 },

  chip: { 

    backgroundColor: '#202425',
     paddingVertical: 10, 
     paddingHorizontal: 16,
      borderRadius: 8 ,

    },

  chipText: {
     color: '#ffffff', 
     fontSize: 14, 
     fontWeight: '600', 
     textAlign: 'center',
     fontFamily:'serif',
     },

  bgImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.35,
    transform: [{ scale: 1.06 }],
  },

  gradientTop: {
    position: 'absolute',
    left: 0, right: 0, top: 0,
    height: 280,
  },

  gradientBottom: {
    position: 'absolute',
    left: 0, right: 0, bottom: 0,
    height: 320,
  },
});
