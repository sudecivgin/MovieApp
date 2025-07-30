import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput as RNTextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  CreatePassword: undefined;
};

const VerificationScreen: React.FC = () => {
  const [code, setCode] = useState<string[]>(['', '', '', '']);
  const inputs = useRef<Array<RNTextInput | null>>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleChange = (text: string, index: number) => {
    if (/^[0-9]?$/.test(text)) {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      if (text !== '' && index < 3) {
        inputs.current[index + 1]?.focus();
      }
    }
  };

  const handleSubmit = () => {
    const enteredCode = code.join('');
    if (enteredCode.length < 4) {

      Alert.alert('Error', 'Please enter the 4 digit code.');
      return;
    }
    navigation.navigate('CreatePassword');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>

        <Icon name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Verifying Your Account</Text>
      <Text style={styles.subtitle}>
        We have just sent you 4 digit code via your email{' '}
        <Text style={styles.email}>sude04@gmail.com</Text>
      </Text>

      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputs.current[index] = ref;
            }}
            style={[styles.codeInput, digit && styles.filledInput]}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)} />

        ))}

      </View>

      <TouchableOpacity style={styles.continueButton} onPress={handleSubmit}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

      <Text style={styles.resendText}>
        Didn’t receive code? <Text style={styles.resendLink}>Resend</Text>
      </Text>
    </View>
  );
};

export default VerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1eff',
    padding: 24,
    justifyContent: 'center',


  },

  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },

  title: {

    fontSize: 22,
    color: '#00e6e6',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'serif',
  },

  subtitle: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'serif',
  },

  email: {
    color: '#fff',
    fontWeight: 'bold',
  },

  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 40,
  },

  codeInput: {
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#00e6e6',
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'serif',
  },

  filledInput: {
    borderColor: '#00e6e6',
    borderWidth: 2,

  },

  continueButton: {
    backgroundColor: '#00e6e6',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },

  continueText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'serif',
  },



  resendText: {
    marginTop: 24,
    color: '#aaa',
    textAlign: 'center',
    fontFamily: 'serif',
  },


  resendLink: {
    color: '#00e6e6',
    
    fontWeight: 'bold',
  },
});
