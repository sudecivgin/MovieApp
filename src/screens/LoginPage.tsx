import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  useNavigation,
  NavigationProp,
} from '@react-navigation/native';

import { AuthContext } from '../context/AuthContext';

// Eğer navigation tipi ayrı bir yerde tanımlı değilse:
type RootStackParamList = {
  LoginScreen: undefined;
  LoginPage: undefined;
  SignUp: undefined;
  ResetPassword: undefined;
};

const LoginPage: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState<string>('sude04@gmail.com');
  const [password, setPassword] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const { login } = useContext(AuthContext)!;

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = () => {
    if (email && password) {
      login();
    } else {
      Alert.alert('Validation Error', 'Please enter both email and password!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Log In</Text>

      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('LoginScreen')}>
        <Icon name="arrow-left" size={24} color="white" />
      </TouchableOpacity>

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTitle}>Welcome!</Text>
        <Text style={styles.welcomeSubtitle}>
          Welcome back! Please enter your details.
        </Text>
      </View>


      <View style={styles.form}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="Email Address"
          placeholderTextColor="#555"  />

        <Text style={[styles.label, { marginTop: 20 }]}>Password</Text>

        <View style={styles.passwordContainer}>
          <TextInput
            style={[
              styles.input,
              {
                flex: 1,
                backgroundColor: 'transparent',
                paddingVertical: 0,
                paddingHorizontal: 0,

                borderRadius: 0,
              },
            ]}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
            placeholder="Password"
            placeholderTextColor="#555" />

          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={togglePasswordVisibility}>
            <Icon
              name={passwordVisible ? 'eye-off' : 'eye'}
              size={24}
              color="#888"/>
          </TouchableOpacity>

        </View>

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.createAccountText}>Create an account</Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.forgotContainer}
          onPress={() => navigation.navigate('ResetPassword')}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}

          onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

};

export default LoginPage;

// -------- STİLLER ----

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#1e1e1eff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  header: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
    marginTop: 25,
  },

  pageTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'serif',

  },

  backButton: {
    position: 'absolute',
    top: 80,
    left: 20,
    zIndex: 10,
  },

  welcomeContainer: {
    marginTop: 30,
    marginBottom: 30,
    alignItems: 'center',
  },

  welcomeTitle: {
    color: '#18D8D8',
    fontSize: 28,

    fontWeight: 'bold',
    marginBottom: 30,
    fontFamily: 'serif',
  },

  welcomeSubtitle: {
    color: '#BBB',
    fontSize: 14,
    fontFamily: 'serif',
  },


  form: {
    width: '100%',
    alignItems: 'flex-start',

  },


  label: {

    color: '#888',
    fontSize: 14,
    marginBottom: 8,
    fontFamily: 'serif',

  },

  input: {

    backgroundColor: '#161616ff',
    color: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    fontSize: 16,
    fontFamily: 'serif',
    width: '100%',
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

  eyeIcon: {
    marginLeft: 10,
  },


  forgotContainer: {

    marginTop: 10,
    alignSelf: 'flex-end',
  },


  forgotText: {
    color: '#18D8D8',
    fontSize: 14,
    fontFamily: 'serif',
  },


  loginButton: {
    backgroundColor: '#18D8D8',
    marginTop: 40,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',

  },

  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'serif',
    
  },
  createAccountText: {

    color: '#00e6e6',
    fontFamily: 'serif',
  },
});
