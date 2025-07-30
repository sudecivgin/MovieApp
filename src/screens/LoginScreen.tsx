import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Eğer bir stack parametre listesi tanımlamadıysan örnek:
type RootStackParamList = {
  LoginPage: undefined;
  SignUp: undefined;
};

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/LOGO.png')}
      />
      <Text style={styles.cinemax}>
        Enter your registered{'\n'}
        Phone Number to Sign Up
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.Text}>
        I already have an account?{' '}
        <Text
          style={styles.loginText}
          onPress={() => navigation.navigate('LoginPage')}
        >
          Login
        </Text>
      </Text>

      <Text style={styles.login}>Or Sign up with</Text>

      <View style={styles.socialIconContainer}>
        <TouchableOpacity
          style={[styles.socialIconButton, { backgroundColor: '#4f4d4d97' }]}
          onPress={() => console.log('Google login')}>


          <MaterialCommunityIcons name="google" size={28} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.socialIconButton, { backgroundColor: '#4267B2' }]}
          onPress={() => console.log('Facebook login')}>


          <Icon name="facebook" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>

  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: 250,
    backgroundColor: '#1e1e1eff',
    alignItems: 'center',
  },

  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },


  input: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    fontFamily: 'serif',
  },

  cinemax: {
    color: '#bbd0d1ff',
    fontFamily: 'serif',
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'center',
  },

  button: {
    backgroundColor: '#12CDD9',
    padding: 15,
    borderRadius: 50,
    marginTop: 10,
    width: 390,
  },


  Text: {
    color: '#fff',
    fontFamily: 'serif',
    marginTop: 25,
    fontSize: 16,
  },

  loginText: {
    color: '#12CDD9',
  },


  login: {
    marginBottom: 50,
    fontFamily: 'serif',
    color: '#bbd0d1ff',
    marginTop: 50,
  },

  buttonText: {
    color: '#212121',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'serif',
    fontSize: 16,
  },

  socialIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20, 
    marginTop: 5,
  },

  socialIconButton: {
    
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
