import React, { useEffect, useMemo, useState } from 'react';
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
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../../navigation/types';
import { TMDB_API_KEY } from '@env';

import { getWatchLater } from '../../utils/WatchLaterStorage';

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

type Genre = { id: number; name: string };

const mapLangToTmdb = (lng: string) => (lng.startsWith('tr') ? 'tr-TR' : 'en-US');

const SearchScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { t, i18n } = useTranslation();
  const tmdbLang = useMemo(() => mapLangToTmdb(i18n.language), [i18n.language]);

  const [todayMovie, setTodayMovie] = useState<Movie | null>(null);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  const setLang = async (lng: 'en' | 'tr') => {
    if (i18n.language.startsWith(lng)) return;
    setLoading(true);
    await i18n.changeLanguage(lng);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const nowPlayingRes = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=${tmdbLang}`
        );
        const nowPlayingData = await nowPlayingRes.json();
        const firstMovie = nowPlayingData.results?.[0];
        if (firstMovie) {

          const movieDetailsRes = await fetch(
            `https://api.themoviedb.org/3/movie/${firstMovie.id}?api_key=${TMDB_API_KEY}&language=${tmdbLang}`
          );
          const movieDetails = await movieDetailsRes.json();
          setTodayMovie({ ...firstMovie, runtime: movieDetails.runtime });
        } else {
          setTodayMovie(null);
        }

        const genresRes = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}&language=${tmdbLang}`
        );
        const genresData = await genresRes.json();
        setGenres([{ id: -1, name: t('ALL', { defaultValue: 'All' }) }, ...(genresData.genres ?? [])]);

        const watchLaterMovies = await getWatchLater();
        const genreCounts: Record<number, number> = {};
        watchLaterMovies.forEach((m) => {
          m.genre_ids?.forEach((id) => {
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
          `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=${tmdbLang}&with_genres=${genreQuery}&sort_by=vote_average.desc&vote_count.gte=500`
        );
        const recData = await recRes.json();

    const watchLaterIds = new Set(watchLaterMovies.map((m) => m.id));
      const filteredRecs = (recData.results ?? []).filter((m: Movie) => !watchLaterIds.has(m.id));
        setPopularMovies(filteredRecs.slice(0, 5));
      } catch (e) {
        console.error('TMDb API error:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tmdbLang, t]);

  const getGenreNames = (ids: number[]) =>
   
    ids?.length ? genres.filter((g) => ids.includes(g.id)).map((g) => g.name).join(', ') : '';
  const getPrimaryGenre = (ids?: number[]) => (ids && ids.length ? getGenreNames(ids).split(', ')[0] : '');

  const renderHeader = () => (
    <View>
      <View style={styles.langSwitch}>
  <TouchableOpacity
          onPress={() => setLang('en')}
          style={[styles.langBtn, i18n.language.startsWith('en') && styles.langBtnActive]}>
          <Text style={[styles.langBtnText, i18n.language.startsWith('en') && styles.langBtnTextActive]}>EN</Text>
      </TouchableOpacity>
  <TouchableOpacity
          onPress={() => setLang('tr')}
          style={[styles.langBtn, i18n.language.startsWith('tr') && styles.langBtnActive]}>
          <Text style={[styles.langBtnText, i18n.language.startsWith('tr') && styles.langBtnTextActive]}>TR</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder={t('SEARCH_A_TITLE')}
          placeholderTextColor="#aaa"
          style={styles.searchInput}/>
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
        contentContainerStyle={styles.categoryContainer}
      />

      {!!todayMovie && (
        <>
          <Text style={styles.sectionTitle}>{t('TODAY')}</Text>
          <View style={styles.todayContainer}>
            <Image source={{ uri: IMAGE_URL + todayMovie.poster_path }} style={styles.todayImage} />
            <View style={styles.todayInfo}>
              <Text style={styles.todayTitle}>{todayMovie.title}</Text>
              <Text style={{ color: '#f5c518', fontSize: 14 }}>⭐ {todayMovie.vote_average.toFixed(1)}</Text>
              <View style={styles.todayMeta}>
                <Text style={styles.metaText}>📅 {todayMovie.release_date?.slice(0, 4)}</Text>
                <Text style={styles.metaText}>
                  ⌚ {todayMovie.runtime ?? '—'} {t('MINUTES_SHORT', { defaultValue: 'min' })}
                </Text>
                <Text style={styles.metaText}>🎬 {getGenreNames(todayMovie.genre_ids || [])}</Text>
              </View>
            </View>
          </View>
        </>
      )}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          {t('RECOMMEND_FOR_YOU', { defaultValue: 'Recommend for you' })}
        </Text>
        <TouchableOpacity />
      </View>

      <FlatList
    data={popularMovies}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
       <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('MovieDetailScreen', { movieId: item.id })}
            style={[styles.card, index === 0 && { marginLeft: 0 }]}>
            <View style={styles.posterWrap}>
              <Image source={{ uri: IMAGE_URL + item.poster_path }} style={styles.poster} />
              {!!item.vote_average && (
                <View style={styles.badge}>
                  <Text style={styles.badgeStar}>★</Text>
                  <Text style={styles.badgeText}>{item.vote_average.toFixed(1)}</Text>
                </View>
              )}
            </View>
            <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.cardMeta} numberOfLines={1}>{getPrimaryGenre(item.genre_ids)}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingRight: 20 }}
      />
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
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
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

  langSwitch: {

    flexDirection: 'row',
    alignSelf: 'flex-end',
    gap: 8,
    marginTop: 36,
  },


  langBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#2b2b2b',
    borderWidth: 1,
    borderColor: '#3a3a3a',
  },

  langBtnActive: {
    backgroundColor: '#00bcd4',
    borderColor: '#00bcd4',
  },


  langBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontFamily: 'serif',
  },


  langBtnTextActive: {
    color: '#000',
  },

  searchContainer: {
    marginTop: 16,
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

  card: {
    width: 160,
    backgroundColor: '#1b1c21ff',
    borderRadius: 18,
    padding: 10,
    marginRight: 14,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
      },
      android: { elevation: 6 },
    }),
  },

  posterWrap: {
    borderRadius: 14,
    overflow: 'hidden',
    position
    : 'relative',
  },

  poster: {
    width: '100%',
    height: 210,
  },

  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ff914d',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },


  badgeStar: { color: '#fff', fontSize: 12, marginRight: 4 },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  cardTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 10,
    fontFamily: 'serif',
  },
  cardMeta: {
    color: '#9aa3b2',
    fontSize: 12,
    marginTop: 2,
    fontFamily: 'serif',
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
    fontFamily: 'serif',
  },
});

