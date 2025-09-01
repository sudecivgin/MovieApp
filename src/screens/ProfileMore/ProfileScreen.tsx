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
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../../navigation/types';
import { AuthContext } from '../../context/AuthContext';

const ProfileScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { logout } = useContext(AuthContext)!;
  const { t } = useTranslation(); 
  const handleLogout = () => {
    Alert.alert(
      t('LOG_OUT'),
      t('ARE_YOU_SURE_LOG_OUT', { defaultValue: 'Are you sure you want to log out?' }),
      [
     { text: t('GO_BACK'), style: 'cancel' },
    {
          text: t('LOG_OUT'),
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
         } catch (error: any) {
              Alert.alert(t('ERROR', { defaultValue: 'Error' }), error.message);
            }
          },
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={require('../../assets/AvatarHome.png')} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>Sude</Text>
          <Text style={styles.email}>Sude04@gmail.com</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <Icon name="account-edit-outline" size={20} color="#00bcd4" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.premiumBox} onPress={() => navigation.navigate('Vip')}>
        <Icon name="crown" size={24} color="#fff" />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.premiumText}>{t('PREMIUM_MEMBER')}</Text>
          <Text style={styles.premiumSubText}>{t('NEW_MOVIES_ARE_COMING_FOR_YOU')}</Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.sectionHeader}>{t('ACCOUNT')}</Text>
      <OptionItem
        icon="lock-outline"
        label={t('CHANGE_PASSWORD')}
        onPress={() => navigation.navigate('ResetPassword')}/>

      <Text style={styles.sectionHeader}>{t('GENERAL')}</Text>
      <OptionItem icon="bell-outline" label={t('NOTIFICATION')} />

      <Text style={styles.sectionHeader}>{t('MORE')}</Text>
      <OptionItem
        icon="file-document-outline"
        label={t('LEGAL_AND_POLICIES')}
        onPress={() => navigation.navigate('Policies')}/>
      <OptionItem
        icon="message-question-outline"
        label={t('HELP_FEEDBACK')}
        onPress={() => navigation.navigate('Help')}/>
      <OptionItem icon="information-outline" label={t('ABOUT_US')} />

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>{t('LOG_OUT')}</Text>
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
    marginTop: 100,
    marginBottom: 20,
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  
  userInfo: { flex: 1 },
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
    backgroundColor: '#b2600e',
    borderRadius: 12,
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
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
    color: '#9e9b9b',
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
