import React from 'react';

import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const popularMovies = [

  { id: '1', title: 'Thor', rating: 4.5, image: require('../../assets/thor.png') },
  { id: '2', title: 'The Fountain', rating: 4.5, image: require('../../assets/fountain.jpg') },

  { id: '3', title: 'Forrest Gump', rating: 4.5, image: require('../../assets/gump.jpg') },
  { id: '4', title: 'Midsommar', rating: 4.5, image: require('../../assets/mid.jpg') },

  { id: '5', title: 'Life of PI', rating: 4.5, image: require('../../assets/lifeofpi.jpg') },
];

const PopularScreen = () => {
  return (
    <View style={styles.container}>
 <FlatList

        data={popularMovies}
        keyExtractor={(item) => item.id}

        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.card}>
        <Image source={item.image} style={styles.image} />
            <Text style={styles.name}>{item.title}</Text>
        <Text style={styles.rating}>⭐ {item.rating}</Text>
   </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}

        showsVerticalScrollIndicator={false}/>
  </View>
  );
};

export default PopularScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    padding: 20,
    paddingTop: 60,
  },

  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'serif',
  },


  card: {
    width: '47%',
    marginBottom: 20,
    marginRight: '3%',
  },

  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,

  },

  name: {
    color: 'white',
    marginTop: 6,
    fontSize: 16,
    fontFamily: 'serif',
  },


  rating: {
 color: '#f5c518',
    fontSize: 13,
  },
});
