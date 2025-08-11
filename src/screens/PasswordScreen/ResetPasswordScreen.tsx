import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

type RootStackParamList = {
  LoginPage: undefined;
};

const ResetPasswordScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleReset = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }

    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert('Success', 'Password reset email sent. Check your inbox.');
      navigation.navigate('LoginPage');
    } catch (error: any) {
      console.error('Password reset error:', error);
      Alert.alert('Error', error.message);
    }
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
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>Send Reset Link</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetPasswordScreen;

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
