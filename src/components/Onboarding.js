import React, { useRef, useState } from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  Text 
} from 'react-native';

import OnboardingItem from '../components/OnboardingItem';
import Paginator from '../components/Paginator';

const slides = [
  {
    id: '1',
    title: 'Hello! Welcome to the best movies.',
    description: 'Start exploring immediately.',
    image: require('../../assets/image1.png')

  },
  {
    id: '2',
    title: 'If you want to record and discover your favorite movies',
    description: 'Find movies, series and more.',
    image: require('../../assets/image2.png')

  },
  {
    id: '2.5',
    title: 'Your taste, our recommendations!',
    description: 'The more you use, the better we get to know you.',
    image: require('../../assets/image4.png')

  },
  {
    id: '3',
    title: 'Ready to dive into the movie world?',
    description: 'Find, watch, and share your favorite films anytime, anywhere.',
    image: require('../../assets/image5.png')

  },
];

export default function Onboarding({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      navigateToLogin();
    }
  };

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={({ item }) => <OnboardingItem item={item} />}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
      />

      <View style={styles.bottomContainer}>
        <Paginator
          totalPages={slides.length}
          currentPage={currentIndex}
          onNextPress={nextSlide}
        />

        {currentIndex !== slides.length - 1 && (
          <TouchableOpacity onPress={navigateToLogin}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#212121',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  skipText: {
    marginTop: 10,
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});
