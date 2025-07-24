import React from 'react';
import { View, FlatList, StyleSheet, } from 'react-native';
import OnboardingItem from './OnboardingItem';

const slides = [
  {
    id: '1',
    title: 'Hello! Welcome to the best movies.',
    description: 'Start exploring immediately.',
    image: require('../assets/image1.png'),
  },
  {
    id: '2',
    title: 'If you want to record and discover your favorite movies',
    description: 'Find movies, series and more.',
    image: require('../assets/image2.png'),
  },

 {
    id: '2.5',
    title: 'Your taste, our recommendations!',
    description: 'The more you use, the better we get to know you.',
    image: require('../assets/image4.png'),
  },
    {
    id: '3',
    title: 'Ready to dive into the movie world?',
    description: 'Find, watch, and share your favorite films anytime, anywhere.',
    image: require('../assets/image5.png'),
  },

];

//const { width } = Dimensions.get('window');

export default function Onboarding() {
  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        renderItem={({ item }) => <OnboardingItem item={item} />}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});