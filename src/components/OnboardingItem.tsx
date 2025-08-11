import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
  
  ImageSourcePropType,
} from 'react-native';

type OnboardingItemProps = {
  item: {

    id: string;
    title: string;
    description: string;
    image: ImageSourcePropType;
  };
};

const OnboardingItem: React.FC<OnboardingItemProps> = ({ item }) => {

  const { width, height } = useWindowDimensions();

  const isFullScreenImage = item.id === '3';

  return (
    <View style={[styles.container, { width, height }]}>
      <Image
        source={item.image}
        style={[
          isFullScreenImage
            ? [styles.fullscreenImage, { width, height }]
            : [styles.image, { width }, item.id === '1' && styles.firstImage],
        ]}

        resizeMode="cover" />

      <View
        style={
          isFullScreenImage
            ? [styles.overlayTextContainer, styles.textContainerWithBox]
            : styles.textContainer  }  >

        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

export default OnboardingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -70,
  },

  image: {
    flex: 0.6,
    justifyContent: 'center',
    marginBottom: 10,
  },

  fullscreenImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  backgroundColor: '#222'
  },

  textContainer: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 0,
  },
  

  textContainerWithBox: {
  backgroundColor: 'rgba(30, 30, 30, 0.8)',
  paddingVertical: 25,
  paddingHorizontal: 20,
  borderRadius: 20,
  borderWidth: 1,
  shadowRadius: 10,
  elevation: 40,
  

},

  overlayTextContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 25,
    marginBottom: 10,
    color: '#12CDD9',
    textAlign: 'center',

    fontWeight: 'bold',
    fontFamily: 'serif',
  },

  description: {
    fontWeight: 'bold',
    color: '#8e939bff',
    textAlign: 'center',
    paddingHorizontal: 64,
    fontFamily: 'serif',
    fontSize: 18,
  },

  firstImage: {
  resizeMode: 'contain',
  marginTop: 20,
},



});
