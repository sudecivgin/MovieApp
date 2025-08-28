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
import remoteConfig from '@react-native-firebase/remote-config';

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

const SLIDE_DEFS: SlideDef[] = [
  {
    id: '1',
    titleKey: 'ONB_TITLE_1',
    descKey:  'ONB_DESC_1',
    image: require('../assets/imageilk.png'),
  },
  {
    id: '2',
    titleKey: 'ONB_TITLE_2',
    descKey:  'ONB_DESC_2',
    image: require('../assets/image2.png'),
  },
  {
    id: '2.5',
    titleKey: 'ONB_TITLE_3',
    descKey:  'ONB_DESC_3',
    image: require('../assets/imagesonn.png'),
  },
  {
    id: '3',
    titleKey: 'ONB_TITLE_4',
    descKey:  'ONB_DESC_4',
    image: require('../assets/imagetum.png'),
  },
];

const Onboarding: React.FC<Props> = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList<Slide>>(null);

  const applyRcFor = async (lang: 'en'|'tr'|'es', fetchFirst = false) => {
    try {
      if (fetchFirst) {
        await remoteConfig().fetchAndActivate();
      }
      const raw = remoteConfig().getString(`languages_${lang}`);
      if (raw) {
        const parsed = JSON.parse(raw);


        i18n.addResourceBundle(lang, 'translation', parsed, true, true);
      }
      await i18n.changeLanguage(lang);
    } catch (e) {
      if (__DEV__) console.warn('applyRcFor error:', e);
      await i18n.changeLanguage(lang);
    }
  };

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
      <View style={styles.debugBar}>
  
        <View style={styles.debugBtns}>
          <TouchableOpacity style={styles.debugBtn} onPress={() => applyRcFor('en')}>
            <Text>EN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.debugBtn} onPress={() => applyRcFor('tr')}>
            <Text>TR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.debugBtn} onPress={() => applyRcFor('es')}>
            <Text>ES</Text>
        
        
          </TouchableOpacity>
        </View>
      </View>

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
        contentContainerStyle={{ paddingTop: 56 }} 
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

debugBar: { 
  position: 'absolute',
  top: 70, 
  left: 0,
  right: 0,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#2b2b2b',
  padding: 8,
  zIndex: 10,
  borderRadius: 8,
  marginHorizontal: 20,
},

debugText: { 
  color: '#fff', 
  fontSize: 12, 
  marginRight: 8 
},
debugBtns: { 
  flexDirection: 'row', 
  gap: 8, 
},
debugBtn: { 
  backgroundColor: '#eee', 
  paddingVertical: 6, 
  paddingHorizontal: 10, 
  borderRadius: 6 
},});
