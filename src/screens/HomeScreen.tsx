import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
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

const avatar: ImageSourcePropType = require('../../assets/AvatarHome.png');
const avatar1: ImageSourcePropType = require('../../assets/avatar1.jpg');
const mid: ImageSourcePropType = require('../../assets/mid.jpg');
const batman: ImageSourcePropType = require('../../assets/batman.jpg');
const wakanda: ImageSourcePropType = require('../../assets/home1.jpg');
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

const popularMovies = [
  { id: '1', title: 'Thor', rating: 4.5, image: thor },
  { id: '2', title: 'The Fountain', rating: 4.5, image: fountain },
  { id: '3', title: 'Forrest Gump', rating: 4.5, image: gump },
  { id: '4', title: 'Midsommar', rating: 4.5, image: mid },
  { id: '5', title: 'Life of PI', rating: 4.5, image: lifeofpi },
];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

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

      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.carousel}>
        {[avatar1, batman, mid, wakanda].map((img, index) => (

          <View key={index} style={styles.carouselItem}>
            <Image source={img} style={styles.featuredImage} />
            <Text style={styles.featuredTitle}>Movie </Text>
            <Text style={styles.featuredDate}>On March 2, 2022</Text>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.category}>CATEGORY</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
        {categories.map((cat, index) => (
          <TouchableOpacity
            key={index}
            style={styles.categoryButton}
            onPress={() => navigation.navigate('Category', { category: cat })}>

            <Text style={styles.categoryText}>{cat}</Text>
          </TouchableOpacity>
            ))}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>MOST POPULAR</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Popular')}>
          <Text style={styles.seeAll}>See All</Text>
      </TouchableOpacity>
      </View>
    </View>
  );

return (
  <KeyboardAvoidingView
    style={{ flex: 1, backgroundColor: '#000' }}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

    <ScrollView
  style={{ backgroundColor: '#181818' }}
  contentContainerStyle={{
    paddingBottom: 40,
    paddingHorizontal: 20, 
  }}
  keyboardShouldPersistTaps="handled"
  showsVerticalScrollIndicator={false}>

{renderHeader()}

      <FlatList
  data={popularMovies}
  horizontal
  keyExtractor={(item) => item.id}
  renderItem={({ item, index }) => (
    <View style={[styles.movieCard, index === 0 && { marginLeft: 0 }]}>
      <Image source={item.image} style={styles.movieImage} />
      <Text style={styles.movieTitle}>{item.title}</Text>
      <Text style={styles.movieRating}>⭐ {item.rating}</Text>
    </View>
  )}

  showsHorizontalScrollIndicator={false}
  contentContainerStyle={{
  
  }}/>

    </ScrollView>
  </KeyboardAvoidingView>
);


};

export default HomeScreen;

const styles = StyleSheet.create({

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 70,
    
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    marginTop:10,
  },

  textContainer: {
    flex: 1,
    fontFamily: 'serif',
    marginTop:10,
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
    marginTop: 60,
    backgroundColor: '#2b2b2bff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: -3,
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
});