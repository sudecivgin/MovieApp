import React from 'react';
import { View, 
    Text, 
    StyleSheet,
     Image,
      FlatList } from 'react-native';

import { useRoute } from '@react-navigation/native';


type CategoryType = 'Comedy' | 'Animation' | 'Documentary' | 'All';

const Posters: Record<CategoryType, any[]> = {
  Comedy: [

    require('../../assets/gump.jpg'),

    require('../../assets/avatar1.jpg'),
  ],


  Animation: [
 require('../../assets/lifeofpi.jpg'),

    require('../../assets/avatar1.jpg'),
  ],


  Documentary: [
 require('../../assets/fountain.jpg'),

    require('../../assets/mid.jpg'),
  ],


  All: [
    require('../../assets/thor.png'),
    require('../../assets/lifeofpi.jpg'),
 require('../../assets/fountain.jpg'),
    require('../../assets/gump.jpg'),

    require('../../assets/avatar1.jpg'),
    require('../../assets/mid.jpg'),
  ],

};


const CategoryScreen: React.FC = () => {

    const route = useRoute();
  const { category } = route.params as { category: CategoryType };

  const posters = Posters[category];

  return (

    <View style={styles.container}>

      <Text style={styles.title}> </Text>

      <FlatList
        data={posters}

        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        
        renderItem={({ item }) => (
          <Image source={item} style={styles.poster} />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false} />
    </View>
  );

};

export default CategoryScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    padding: 20,
    
    paddingTop: 10,
  },


  title: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'serif',
  },

  poster: {
    width: 150,
    height: 220,
    borderRadius: 10,
    marginBottom: 20,
    marginRight: 10,
  },

  list: {
    paddingBottom: 20,

  },
});
