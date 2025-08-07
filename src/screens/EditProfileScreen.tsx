import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const EditProfileScreen = () => {
  const [fullName, setFullName] = useState('Sude');
  const [email, ] = useState('Sude04@gmail.com');
  const [password, ] = useState('************');
  const [phone, ] = useState('+90 545564646486');
  
  const [error, setError] = useState('');

  const handleSave = () => {
    if (fullName.trim() === 'Sude Çıvgın') {
      setError('Name already exist');
    } else {
      
      setError('');
      Alert.alert('Success', 'Profile updated successfully.');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>


      <View style={styles.profileSection}>
        <Image source={require('../../assets/AvatarHome.png')} style={styles.avatar} />
        <TouchableOpacity style={styles.editIcon}>
          <Icon name="pencil" size={14} color="#181818" />

        </TouchableOpacity>
        <Text style={styles.name}>Sude</Text>
        <Text style={styles.email}>{email}</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          value={fullName}

          onChangeText={setFullName}
        />
        {error ? <Text style={styles.errorText}>* {error}</Text> : null}

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} editable={false} />

        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} value={password} secureTextEntry editable={false} />

        <Text style={styles.label}>Phone Number</Text>

        <TextInput style={styles.input} value={phone} editable={false} />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerTitle: {
    color: '#181818',
    fontSize: 18,
    fontFamily: 'serif',
  },
  
  profileSection: {
    alignItems: 'center',
    marginVertical: 30,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },

  editIcon: {
    position: 'absolute',
    bottom: 27,
    right: 135,
    backgroundColor: '#00bcd4',
    padding: 4,
    borderRadius: 12,


  },
  
  name: {
    color: '#fff',
    fontSize: 18,
    marginTop: 18,
    fontFamily: 'serif',

  },

  email: {
    color: '#aaa',
    fontSize: 14,
    fontFamily: 'serif',
    marginTop:10,
  },

  form: {
    marginTop: 20,
  },
  
  label: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 4,
    fontFamily: 'serif',

  },
  input: {
    backgroundColor: '#252525',
    paddingVertical: 12,
    paddingHorizontal: 16,

    borderRadius: 8,
    color: '#fff',
    fontFamily: 'serif',
    marginBottom: 16,
  },


  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },

  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -12,
    marginBottom: 12,
    fontFamily: 'serif',
  },

  saveButton: {
    backgroundColor: '#00e0ff',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,

  },

  saveButtonText: {
    color: '#181818',
    fontWeight: 'bold',
    fontFamily: 'serif',
    fontSize: 16,
  },
});
