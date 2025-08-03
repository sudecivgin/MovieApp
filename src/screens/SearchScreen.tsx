import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Platform,

} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';


type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const mid: ImageSourcePropType = require('../../assets/mid.jpg');
const thor: ImageSourcePropType = require('../../assets/thor.png');
const fountain: ImageSourcePropType = require('../../assets/fountain.jpg');
const lifeofpi: ImageSourcePropType = require('../../assets/lifeofpi.jpg');

const gump: ImageSourcePropType = require('../../assets/gump.jpg');

const categories: RootStackParamList['Category']['category'][] = [
  'All',
  'Comedy',
  'Animation',
  'Documentary',
];


const todayMovie = {
  title: 'Dune: Desert Planet',
  year: 2021,
  duration: '148 Minutes',
  rating: 'PG-18',
  genre: 'Action',
  type: 'Movie',
  score: 4.3,

  isPremium: true,
  image: require('../../assets/dune.jpg'), 
};



const popularMovies = [
  { id: '1', title: 'Thor', rating: 4.5, image: thor },
  { id: '2', title: 'The Fountain', rating: 4.5, image: fountain },
  { id: '3', title: 'Forrest Gump', rating: 4.5, image: gump },
  { id: '4', title: 'Midsommar', rating: 4.5, image: mid },
  { id: '5', title: 'Life of PI', rating: 4.5, image: lifeofpi },
];

const SearchScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

    const renderToday = () => (
    <View style={styles.todayContainer}>
      <Image source={todayMovie.image} style={styles.todayImage} />
      <View style={styles.todayInfo}>
        
        {todayMovie.isPremium && (

          <View style={styles.premiumBadge}>
            <Text style={styles.premiumText}>Premium</Text>
          </View>
        )}
        <Text style={styles.todayTitle} numberOfLines={1}>{todayMovie.title}</Text>
        <Text style={{ color: '#f5c518', fontSize: 14 }}>⭐ {todayMovie.score}</Text>
        <View style={styles.todayMeta}>
          <Text style={styles.metaText}>📅 {todayMovie.year}</Text>
          <Text style={styles.metaText}>⌚ {todayMovie.duration}</Text>

          <Text style={styles.metaBadge}>{todayMovie.rating}</Text>
        </View>
        <Text style={styles.metaText}>🎬 {todayMovie.genre} | {todayMovie.type}</Text>
      </View>
    </View>
  );
const renderHeader = () => (
    <View>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Type title, categories, years, etc..."
          placeholderTextColor="#aaa"
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => navigation.navigate('Category', { category: item })}
          >
            <Text style={styles.categoryText}>{item}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.categoryContainer}
      />

      <Text style={styles.sectionTitle}>Today</Text>
      {renderToday()}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recommend for you</Text>
        <TouchableOpacity onPress={() => navigation.getParent()?.navigate('Popular')}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={popularMovies}
        
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.movieCard}>
            <Image source={item.image} style={styles.movieImage} />
            <Text style={styles.movieTitle}>{item.title}</Text>
            <Text style={styles.movieRating}>⭐ {item.rating}</Text>
          </View>
        )}
        showsHorizontalScrollIndicator={false}/>

    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#181818' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        
     <FlatList
  data={[]}
  renderItem={() => null}
  ListHeaderComponent={renderHeader}
  contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 20 }}
  showsVerticalScrollIndicator={false}/>

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
    marginTop: -8,
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


  featuredDate: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 2,
  },



  categoryContainer: {
    marginBottom: 20,
    marginTop:30,
  },

  categoryButton: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    height: 32,
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
     width: 120,
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
    marginBottom:20,
    marginTop:20,
  },

  seeAll: {
    color: '#00bcd4',
    fontSize: 14,
  },

  movieCard: {
    marginRight: 16,
    width
    : 120,
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
    marginBottom:30,
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

  premiumBadge: {
    backgroundColor: '#ff9800',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },

  premiumText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
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
  metaBadge: {

    backgroundColor: '#00bcd4',
    color: '#fff',
    fontSize: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
  },

});