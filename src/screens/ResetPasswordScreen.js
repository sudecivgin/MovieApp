import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const ResetPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleReset = () => {
  if (!email) {
    alert('Please enter your email.');
    return;
  }

  navigation.navigate('Verification');
};

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.subtitle}>Recover your account password</Text>

      <Text style={styles.label}>Email Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"/>

      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1eff',
    padding: 24,

  paddingTop: 200, 
  justifyContent: 'flex-start', 

  },


  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  title: {
    fontSize: 24,
    color: '#00e6e6',
    fontWeight: 'bold',
    marginBottom: 0,
    textAlign: 'center',
    fontFamily: 'serif',
  },
  subtitle: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'serif',
  },
  label: {
    color: '#ccc',
    marginBottom: 8,
    fontFamily: 'serif',
  },
  input: {
    backgroundColor: '#161616ff',
    padding: 16,
    borderRadius: 16,
    color: '#fff',
    marginBottom: 24,
    fontFamily: 'serif',
  },

  button: {
    backgroundColor: '#00e6e6',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'serif',
  },

});

export default ResetPasswordScreen;
