import React from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';


const avatar = require('../../assets/AvatarHome.png');


const HomeScreen = () => {
  return (

      <View style={styles.container}>
      
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
    </View>
  );
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },

  textContainer: {
    flex: 1,
  },

  helloText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    fontFamily:'serif',
  },

  subtitle: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 4,
    fontFamily:'serif',

  },

  searchContainer: {
    marginTop: 60,
    backgroundColor: '#2b2b2bff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  searchInput: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'serif',
  },
});

export default HomeScreen;
