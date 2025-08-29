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
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';

type RootStackParamList = {
  LoginScreen: undefined;
  LoginPage: undefined;
  SignUp: undefined;
  ResetPassword: undefined;
};

const LoginPage: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
  const { login } = useContext(AuthContext)!;

  const [email, setEmail] = useState('');


  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      await login(email, password);
    } catch (error: any) {
      console.error('Login failed:', error);
      Alert.alert('Login Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>{t('LOG_IN')}</Text>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('LoginScreen')}
        accessibilityRole="button"
        accessibilityLabel={t('GO_BACK')}>

        <Icon name="arrow-left" size={24} color="white" />
      </TouchableOpacity>

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTitle}>{t('WELCOME')}</Text>
        <Text style={styles.welcomeSubtitle}>

          {t('WELCOME_BACK_PLEASE_ENTER_YOUR_DETAILS')}
        </Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>{t('EMAIL_ADDRESS')}</Text>
        <TextInput
          style={styles.input}
          placeholder={t('ENTER_YOUR_EMAIL')}
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          accessibilityLabel={t('EMAIL_ADDRESS')}/>

       <Text style={[styles.label, { marginTop: 20 }]}>{t('PASSWORD')}</Text>
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
            placeholder={t('PASSWORD')}
            placeholderTextColor="#555"
            accessibilityLabel={t('PASSWORD')}/>

          <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
            <Icon name={passwordVisible ? 'eye-off' : 'eye'} size={24} color="#888" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.createAccountText}>{t('CREATE_AN_ACCOUNT')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.forgotContainer}
          onPress={() => navigation.navigate('ResetPassword')}>
            
          <Text style={styles.forgotText}>{t('FORGOT_PASSWORD')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>{t('LOG_IN')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(30,30,30,1)',
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
