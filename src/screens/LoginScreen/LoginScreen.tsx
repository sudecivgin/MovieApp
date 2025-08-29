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
import { useTranslation } from 'react-i18next';

type RootStackParamList = {
  LoginPage: undefined;
  SignUp: undefined;
};

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/LOGO.png')}/>


      <Text style={styles.cinemax}>
        {t('ENTER_YOUR_REGISTERED_N_PHONE_NUMBER')}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignUp')}
        accessibilityLabel={t('SIGN_UP')}>

        <Text style={styles.buttonText}>{t('SIGN_UP')}</Text>
      </TouchableOpacity>

 <Text style={styles.Text}>
        {t('I_ALREADY_HAVE_AN_ACCOUNT')}{' '}
        <Text
          style={styles.loginText}
          onPress={() => navigation.navigate('LoginPage')}
          accessibilityRole="button"
          accessibilityLabel={t('LOGIN')}>

          {t('LOGIN')}
        </Text>
      </Text>

      <Text style={styles.login}>{t('OR_SIGN_UP_WITH')}</Text>
      <View style={styles.socialIconContainer}>
    <TouchableOpacity
          style={[styles.socialIconButton, { backgroundColor: '#4f4d4d97' }]}
          onPress={() => console.log('Google login')}
          accessibilityLabel="Google">

          <MaterialCommunityIcons name="google" size={28} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.socialIconButton, { backgroundColor: '#4267B2' }]}
          onPress={() => console.log('Facebook login')}
          accessibilityLabel="Facebook">

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
