import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DownloadsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Downloads Screen</Text>
    </View>
  );
};

export default DownloadsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
});
