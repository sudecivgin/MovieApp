import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Image } from 'react-native';

export default function OnboardingItem({ item }) {
  const { width, height } = useWindowDimensions();

  const isFullScreenImage = item.id === '3'; // sadece 3. sayfa için tam ekran

  return (
    <View style={[styles.container, { width, height }]}>
      <Image
        source={item.image}
        style={isFullScreenImage ? [styles.fullscreenImage, { width, height }] : [styles.image, { width }]}
        resizeMode="cover"
      />

      <View style={isFullScreenImage ? [styles.overlayTextContainer, styles.textContainerWithBox] : styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
}

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
    marginTop:0,
  },

  fullscreenImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
 textContainer: {
  flex: 0.10,
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingTop: 0,
},

  overlayTextContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
    color: '#9486dcbc',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  description: {
    fontWeight: 'bold',
    color: '#8e939bff',
    textAlign: 'center',
    paddingHorizontal: 64,
    fontSize: 18,
  },
  textContainerWithBox: {
    backgroundColor: '#212121', // opak siyah
    padding: 40,
    borderRadius: 30,           // yumuşak köşe
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 50,   
     width: '100%',      
marginBottom:0.1,  },
});