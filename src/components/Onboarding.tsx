import React, { useRef, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewToken,
} from 'react-native';

import { useTranslation } from 'react-i18next';
import OnboardingItem from '../components/OnboardingItem';
import Paginator from '../components/Paginator';
import { StackNavigationProp } from '@react-navigation/stack';

type Slide = {
  id: string;
  title: string;
  description: string;
  image: any;
};

type SlideDef = {
  id: string;
  titleKey: string;
  descKey: string;
  image: any;
};

type NavigationProp = StackNavigationProp<any, 'Onboarding'>;
type Props = { navigation: NavigationProp };

// Onboarding slide tanımları (sadece key + görsel)
const SLIDE_DEFS: SlideDef[] = [
  {
    id: '1',
    titleKey: "The latest movies and\nseries are here",
    descKey: "Streaming in high quality",
    image: require('../../assets/imageilk.png'),
  },
  {
    id: '2',
    titleKey: "Download to watch later",
    descKey:"Ad-free viewing experience",
    image: require('../../assets/image2.png'),
  },
  {
    id: '2.5',
    titleKey: "Stream on multiple devices",
    descKey: "Text of different languages",
    image: require('../../assets/imagesonn.png'),
  },
  {
    id: '3',
    titleKey:  "With the best audio quality",
    descKey: "Let’s stream your favorite movie",
    image: require('../../assets/imagetum.png'),
  },
];

const Onboarding: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList<Slide>>(null);

  // Key’leri çeviriyle doldur
  const slides: Slide[] = SLIDE_DEFS.map(d => ({
    id: d.id,
    title: t(d.titleKey),
    description: t(d.descKey),
    image: d.image,
  }));

  const navigateToLogin = () => {
    navigation.navigate('LoginScreen');
  };

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      navigateToLogin();
    }
  };

  const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index != null) {
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
            <Text style={styles.skipText}>{t('ONBOARDING_SKIP')}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1eff',
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
    fontFamily: 'serif',
  },
});
