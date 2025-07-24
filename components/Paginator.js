import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default function Paginator({ totalPages = 3, currentPage = 0, onNextPress }) {
  // currentPage: aktif sayfa indeksi (0'dan başlar)

  return (
    <View style={styles.container}>

      <View style={styles.leftGroup}>
        {Array.from({ length: totalPages }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === currentPage ? styles.activeDot : styles.inactiveDot,
            ]}/>
        ))}

     <View style={styles.bar} />
       </View>
<TouchableOpacity style={styles.nextButton} onPress={onNextPress}>
  <Icon name="arrowright" size={24} color="#000" />
</TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
    
container: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 20,
  paddingVertical: 20,
  marginTop: 20,
},

  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },
  activeDot: {
    backgroundColor: '#12CDD9',
  },
  inactiveDot: {
    backgroundColor: '#a0a0a0', 
  },
  bar: {
    width: 40,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#12CDD9',
  },

  nextButton: {
    backgroundColor: '#12CDD9',
    borderRadius: 24,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,

  },
});
