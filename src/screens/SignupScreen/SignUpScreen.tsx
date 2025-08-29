import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';

type RootStackParamList = {

  LoginScreen: undefined;
};

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { signup } = useContext(AuthContext)!;
  const { t } = useTranslation();

  const [fullName, setFullName] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [secureText, setSecureText] = useState(true);

  const handleSignUp = async () => {
    if (!isChecked) {

      Alert.alert('Warning', 'Please accept the terms and conditions.');
      return;
    }

    if (!email || !password || !fullName) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (!email.includes('@') || password.length < 6) {
      Alert.alert('Error', 'Enter a valid email and a password (min 6 chars).');
      return;
    }

    try {

      await signup(email, password, fullName);
      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('LoginScreen');
    } catch (error: any) {
      Alert.alert('Signup Error', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.pageTitle}>{t('SIGN_UP')}</Text>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('LoginScreen')}
          accessibilityRole="button"
          accessibilityLabel={t('GO_BACK')}>

          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>

        <Text style={styles.title}>{t('LET_S_GET_STARTED')}</Text>
        <Text style={styles.subtitle}>{t('THE_LATEST_MOVIES_AND_SERIES_ARE')}</Text>

        <TextInput
          style={styles.input}
          placeholder={t('YOUR_NAME')}
          placeholderTextColor="#888"
          value={fullName}
          onChangeText={setFullName}
          accessibilityLabel={t('FULL_NAME')}/>


        <TextInput
          style={styles.input}
          placeholder={t('ENTER_YOUR_EMAIL')}
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          accessibilityLabel={t('EMAIL_ADDRESS')}/>


        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder={t('PASSWORD')}
            placeholderTextColor="#888"
            secureTextEntry={secureText}
            value={password}
            onChangeText={setPassword}
            autoCorrect={false}
            accessibilityLabel={t('PASSWORD')}/>


          <TouchableOpacity onPress={() => setSecureText(!secureText)} accessibilityRole="button">
            <Icon
              name={secureText ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color="#888"/>

          </TouchableOpacity>
        </View>

    <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={() => setIsChecked(!isChecked)} style={styles.checkbox} accessibilityRole="checkbox" accessibilityState={{ checked: isChecked }}>
            {isChecked && <View style={styles.checkedBox} />}
          </TouchableOpacity>
          <Text style={styles.checkboxText}>
            {t('I_AGREE_TO_THE')}{' '}
            <Text style={styles.link}>{t('TERMS_AND_SERVICES')}</Text> {t('AND')}{' '}
            <Text style={styles.link}>{t('PRIVACY_POLICY')}</Text>
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.button, !isChecked && styles.buttonDisabled]}
          onPress={handleSignUp}
          disabled={!isChecked}
          accessibilityRole="button"
          accessibilityLabel={t('SIGN_UP')}>

          <Text style={styles.buttonText}>{t('SIGN_UP')}</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
    
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    backgroundColor: 'rgba(30,30,30,1)',
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
    marginTop: 22,
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
  buttonDisabled: {
    backgroundColor: '#444',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'serif',
  },
});
