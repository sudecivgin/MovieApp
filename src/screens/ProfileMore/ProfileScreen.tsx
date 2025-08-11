import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { AuthContext } from '../../context/AuthContext';

const ProfileScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { logout } = useContext(AuthContext)!;

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: async () => {
          try {
            await logout();
          } catch (error: any) {
            Alert.alert('Error', error.message);
          }
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
<Image source={require('../../../assets/AvatarHome.png')} style={styles.avatar} />
        <View style={styles.userInfo}>

          <Text style={styles.name}>Sude</Text>
          <Text style={styles.email}>Sude04@gmail.com</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <Icon name="account-edit-outline" size={20} color="#00bcd4" />
        </TouchableOpacity>
      </View>

      {/* Premium Kısmı*/}

      <View style={styles.premiumBox}>
        <Icon name="crown" size={24} color="#fff" />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.premiumText}>Premium Member</Text>
          <Text style={styles.premiumSubText}>
            New movies are coming for you, Download Now!
          </Text>
        </View>
      </View>

      {/* Account kısmı*/}

      <Text style={styles.sectionHeader}>Account</Text>

<OptionItem
  icon="lock-outline"
  label="Change Password"
  onPress={() => navigation.navigate('ResetPassword')}/>

      {/* General  */}
      <Text style={styles.sectionHeader}>General</Text>
      <OptionItem icon="bell-outline" label="Notification" />

      {/* More  */}
      <Text style={styles.sectionHeader}>More</Text>
      <OptionItem
        icon="file-document-outline"
        label="Legal and Policies"
        onPress={() => navigation.navigate('Policies')}/>

<OptionItem
  icon="message-question-outline"
  label="Help & Feedback"
  onPress={() => navigation.navigate('Help')}/>

      <OptionItem icon="information-outline" label="About Us" />

      {/* Logout */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const OptionItem = ({
  icon,
  label,
  onPress,
}: {

  icon: string;
  label: string;
  onPress?: () => void;

}) => (

  <TouchableOpacity style={styles.optionRow} onPress={onPress}>
    <Icon name={icon} size={22} color="#fff" style={{ width: 30 }} />
    <Text style={styles.optionText}>{label}</Text>
    <Icon name="chevron-right" size={18} color="#888" style={{ marginLeft: 'auto' }} />
  </TouchableOpacity>
);


export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    paddingHorizontal: 20,
  },

  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 70,
    marginBottom: 20,
  },
  
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },

  userInfo: {
    flex: 1,
  },

  name: {

    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },

  email: {
    color: '#ccc',
    fontSize: 14,
    fontFamily: 'serif',
  },

  premiumBox: {
    backgroundColor: '#9f5000ff',
    borderRadius: 12,
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 30,
  },



  premiumText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'serif',
  },

  premiumSubText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
      fontFamily: 'serif',
  },
  sectionHeader: {
    color: '#9e9b9bff',
    fontSize: 14,
    fontWeight: '900',
    marginTop: 20,
    marginBottom: 8,
    fontFamily: 'serif',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomColor: '#2b2b2b',
       borderBottomWidth: 1,
  },
  optionText: {
    color: '#fff',
    fontSize: 15,
    marginLeft: 8,
    fontFamily: 'serif',
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: '#00bcd4',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    marginVertical: 30,
  },
  
  logoutText: {
    color: '#00bcd4',
    fontWeight: 'bold',
    fontSize: 16,
          fontFamily: 'serif',
  },
});
