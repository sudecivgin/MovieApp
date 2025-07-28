import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  const navigation = useNavigation(); 

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [secureText, setSecureText] = useState(true);

  const handleSignUp = () => {
    if (!isChecked) {
      alert('Lütfen şartları kabul edin.');
      return;
    }
    alert(`Hoş geldin, ${fullName}`);
  };

  return (
<ScrollView contentContainerStyle={styles.container}>
  <View style={styles.header}>
    <Text style={styles.pageTitle}>Sign Up</Text>
  </View>

<TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('LoginScreen')}>
  <Icon name="arrow-left" size={24} color="white" />
</TouchableOpacity>

      <Text style={styles.title}>Let’s get started</Text>
      <Text style={styles.subtitle}>The latest movies and series are here</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#888"
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor="#888"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry={secureText}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <Icon
            name={secureText ? 'eye-off-outline' : 'eye-outline'}
            size={22}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={() => setIsChecked(!isChecked)} style={styles.checkbox}>
          {isChecked ? <View style={styles.checkedBox} /> : null}
        </TouchableOpacity>
        <Text style={styles.checkboxText}>
          I agree to the <Text style={styles.link}>Terms and Services</Text> and{' '}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, !isChecked && styles.buttonDisabled]}
        onPress={handleSignUp}
        disabled={!isChecked}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#212121',
    padding: 24,
    justifyContent: 'center',
  },
 backButton: {
    position: 'absolute',
    top: 80,
    left: 20,
    zIndex: 10,
  },

header: {
  position: 'absolute',
  top: 50,
  left: 0,
  right: 0,
  alignItems: 'center', 
  zIndex: 10,
},


pageTitle: {
  color: '#fff',
  fontSize: 18,
  fontWeight: 'bold',
  fontFamily: 'serif',
  marginTop:22,
},

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#00e6e6',
    textAlign: 'center',
    marginBottom: 6,
    fontFamily: 'serif',
  },
  subtitle: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 32,
    fontFamily: 'serif',
  },
  input: {
    backgroundColor: '#161616ff',
    padding: 16,
    borderRadius: 16,
    color: '#fff',
    marginBottom: 16,
    fontFamily: 'serif',
  },
  passwordContainer: {
    backgroundColor: '#161616ff',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
    color: '#fff',
    paddingRight: 10,
    fontFamily: 'serif',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxText: {
    color: '#ccc',
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 13,
    fontFamily: 'serif',
  },

  checkedBox: {
    width: 12,
    height: 12,
    backgroundColor: '#00e6e6',
  },

  link: {
    color: '#00e6e6',
    fontFamily: 'serif',
  },
  button: {
    backgroundColor: '#00e6e6',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonsDisabled: {
    backgroundColor: '#444',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'serif',
  },
});

export default SignUpScreen;
