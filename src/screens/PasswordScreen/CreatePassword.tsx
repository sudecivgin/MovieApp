import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useNavigation, NavigationProp } from '@react-navigation/native';

import { RootStackParamList } from '../../navigation/types';
import { Alert } from 'react-native';


const CreatePassword: React.FC = () => {

  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [secureNew, setSecureNew] = useState<boolean>(true);
  const [secureConfirm, setSecureConfirm] = useState<boolean>(true);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

const handleReset = () => {
  if (!newPassword || !confirmPassword) {
    Alert.alert('Missing Fields', 'Please fill in both fields');
    return;
  }
  if (newPassword !== confirmPassword) {
    Alert.alert('Password Error', 'Passwords do not match');
    return;
  }
  Alert.alert('Success', 'Password successfully reset!');
};

  return (
  <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>

        <Icon name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>

  <Text style={styles.title}>Create New Password</Text>
  <Text style={styles.subtitle}>Enter your new password</Text>

      <View style={styles.inputWrapper}>
        <TextInput
       
    style={styles.input}
        placeholder="New Password"
          placeholderTextColor="#aaa"
      secureTextEntry={secureNew}
        value={newPassword}
          onChangeText={setNewPassword} />

        <TouchableOpacity onPress={() => setSecureNew(!secureNew)}>

          <Icon name={secureNew ? 'eye-off-outline' : 'eye-outline'} size={22} color="#888" />
        </TouchableOpacity>

      </View>

  <View style={styles.inputWrapper}>
    <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#aaa"
          secureTextEntry={secureConfirm}
          value={confirmPassword}
          onChangeText={setConfirmPassword}/>

        <TouchableOpacity onPress={() => setSecureConfirm(!secureConfirm)}>
          <Icon name={secureConfirm ? 'eye-off-outline' : 'eye-outline'} size={22} color="#888" />
          
        </TouchableOpacity>
      </View>

   <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
    <Text style={styles.resetText}>Reset</Text>
      </TouchableOpacity>
    </SafeAreaView>

  );
};

export default CreatePassword;

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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00e6e6',
    fontFamily: 'serif',
    textAlign: 'center',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 14,
    color: '#aaa',
    fontFamily: 'serif',
    textAlign: 'center',
    marginBottom: 40,
  },

  inputWrapper: {
    backgroundColor: '#161616ff',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },


  input: {
    flex: 1,
    color: '#fff',
    fontFamily: 'serif',
  },



  resetButton: {
    backgroundColor: '#00e6e6',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },

  
  resetText: {
    fontFamily: 'serif',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    
  },
});
