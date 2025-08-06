import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';


const Policies = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Privacy Policy</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Terms</Text>
        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
           Eget ornare quam vel facilisis feugiat amet sagittis arcu, tortor. Sapien, consequat ultrices morbi orci semper sit nulla.
            Leo auctor ut etiam est, amet aliquet ut vivamus. Odio vulputate est id tincidunt fames.
        </Text>
        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget ornare quam vel facilisis feugiat amet sagittis arcu, tortor. Sapien, consequat ultrices morbi orci semper sit nulla. Leo auctor ut etiam est, amet aliquet ut vivamus. Odio vulputate est id tincidunt fames.
        </Text>

        <Text style={styles.sectionTitle}>Changes to the Service and/or Terms:</Text>
        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
           Eget ornare quam vel facilisis feugiat amet sagittis arcu, tortor. Sapien, consequat ultrices morbi orci semper sit nulla. Leo auctor ut etiam est, amet aliquet ut vivamus. Odio vulputate est id tincidunt fames.
        </Text>
        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
           Eget ornare quam vel facilisis feugiat amet sagittis arcu, tortor.
            Sapien, consequat ultrices morbi orci semper sit nulla. Leo auctor ut etiam est, amet aliquet ut vivamus. Odio vulputate est id tincidunt fames.
        </Text>
      </ScrollView>
    </View>
  );
};

export default Policies;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomColor: '#181818',
    borderBottomWidth: 1,
    marginTop:40,
    
  },
  backButton: {
    paddingRight: 10,
    
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 4,
    fontFamily:'serif',

  },
  scrollContent: {
    padding: 18,
    
  },
  sectionTitle: {
    color: '#aaa',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 8,
    marginTop: 16,
        fontFamily:'serif',


  },
  paragraph: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 15,
        fontFamily:'serif',

  },
});
