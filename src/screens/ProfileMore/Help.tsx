import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';

const Help = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!name || !email || !message) {

      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    Alert.alert('Success', 'Your message has been sent!');
    setName('');
    setEmail('');

    setMessage('');
  };

  const faqs = [
 { question: 'How can I reset my password?' },
    { question: 'Where can I find my subscription?' },
    { question: 'How do I contact support?' },
  ];

  return (
    <ScrollView style={styles.container}>


  <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Help & Feedback</Text>
        <View style={{ width: 24 }} />
      </View>

      <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
     <View style={styles.card}>
        {faqs.map((faq, index) => (
          <View key={index} style={styles.faqItem}>
            <Text style={styles.faqText}>• {faq.question}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Send Us a Message</Text>
      <View style={styles.card}>
<TextInput
          style={styles.input}
          placeholder="Your Name"
      placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}/>


    <TextInput
          style={styles.input}
          placeholder="Your Email"
      placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"/>


   <TextInput
          style={[styles.input, { height: 100 }]}

          placeholder="Your Message"
       placeholderTextColor="#aaa"
          value={message}
          onChangeText={setMessage}
          multiline/>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
         <Text style={styles.buttonText}>Submit Feedback</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Help;

const styles = StyleSheet.create({

  container: {

    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 40,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'serif',
      marginLeft: 12,



  },
  sectionTitle: {
    color: '#aaa',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 18,
    marginTop: 20,
    fontFamily: 'serif',
  },

  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },

  faqItem: {
    paddingVertical: 15,
  },


  faqText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'serif',
  },


  input: {
    backgroundColor: '#2A2A2A',
    color: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    fontFamily: 'serif',
  },


  button: {
    backgroundColor: '#00e6e6',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },


  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'serif',
  },
});
