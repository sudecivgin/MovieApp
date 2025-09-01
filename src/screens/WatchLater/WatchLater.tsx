import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { getWatchLater, removeFromWatchLater, Movie } from '../../utils/WatchLaterStorage';

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const WatchLater: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadMovies = useCallback(async () => {
    try {
      const saved = await getWatchLater();
      setMovies(saved);
    } catch (error) {
      console.error('Failed to load Watch Later list:', error);
    }
  }, []);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  const setLang = async (lng: 'en' | 'tr') => {
    if (i18n.language.startsWith(lng)) return;
    await i18n.changeLanguage(lng);
  };

  const handleRemove = useCallback(
    async (id: number, title?: string) => {
      Alert.alert(
        t('REMOVE', { defaultValue: 'Remove' }),
        title ? `“${title}”` : undefined,
        [
          { text: t('GO_BACK', { defaultValue: 'Go back' }), style: 'cancel' },
          {
            text: t('REMOVE', { defaultValue: 'Remove' }),
            style: 'destructive',
            onPress: async () => {
              await removeFromWatchLater(id);
              loadMovies();
            },
          },
        ],
      );
    },
    [loadMovies, t],
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadMovies();
    setRefreshing(false);
  }, [loadMovies]);

  const renderItem = ({ item }: { item: Movie }) => (
    <View style={styles.card}>
      <Image source={{ uri: IMAGE_URL + item.poster_path }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.movieTitle}>{item.title}</Text>
        {!!item.vote_average && (
          <Text style={styles.rating}>⭐ {item.vote_average.toFixed(1)}</Text>
        )}
        <TouchableOpacity onPress={() => handleRemove(item.id, item.title)}>
          <Text style={styles.remove}>{t('REMOVE', { defaultValue: 'Remove' })}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
   <SafeAreaView style={styles.container}>
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

      <Text style={styles.title}>{t('WATCH_LATER')}</Text>

      <FlatList
        style={{ flex: 1 }}
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListEmptyComponent={
       <Text style={styles.empty}>
            {t('NO_MOVIES_ADDED_YET', { defaultValue: 'No movies added yet.' })}
          </Text>
        }
       contentContainerStyle={
          movies.length === 0
            ? { flexGrow: 1, justifyContent: 'center' }
            : { paddingBottom: 16 }
        }
        showsVerticalScrollIndicator
        removeClippedSubviews
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#00bcd4"
            colors={['#00bcd4']}
          />
        }/>
    </SafeAreaView>
  );
};

export default WatchLater;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    padding: 16,
  },

  langSwitch: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    gap: 8,
    marginTop: 4,
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
    fontSize: 16,
    fontFamily: 'serif',
  },


  card: {
    flexDirection: 'row',
    backgroundColor: '#1c1c1c',
    borderRadius: 10,
    overflow: 'hidden',
    paddingRight: 8,
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
