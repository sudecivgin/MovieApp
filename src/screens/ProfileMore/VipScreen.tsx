import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Vip: undefined;
  Login: undefined;
};

const VipScreen: React.FC = () => {
const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#181818' }}>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>


     <View style={styles.topBar}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>VIP</Text>
          <View style={{ width: 34 }} />
        </View>

        <TouchableOpacity activeOpacity={0.9} style={styles.accessBtn}>
          <Text style={styles.accessBtnText}>Access Premium</Text>
        </TouchableOpacity>

        <Text style={styles.subtitle}>The latest movies and{'\n'}series are here</Text>

        {/*kartların bulunduğu yer */}

 <View style={styles.cardsRow}>
       <LinearGradient
            colors={['#33D3FF', '#00BFE3', '#00CDEB']}
            start={{ x: 0, y: 0.2 }}
            end={{ x: 1, y: 1 }}
            style={[styles.card, styles.monthlyCard]}>

            <Text style={styles.cardTitleLight}>Monthly Subscription</Text>
            <Text style={styles.priceLight}>
              <Text style={styles.currencyLight}>Rp</Text>54.000/
        </Text>
            <Text style={styles.periodLight}>Month</Text>
          </LinearGradient>

      <View style={[styles.card, styles.annualCard]}>
            <Text style={styles.cardTitleDark}>Annual Subscription</Text>
            <Text style={styles.priceDark}>
              <Text style={styles.currencyDark}>Rp</Text>200.000/
            </Text>
            <Text style={styles.periodDark}>Years</Text>
          </View>
        </View>

     <View style={styles.featuresGrid}>
          <Feature icon="movie-open-play-outline" text="Streaming in high quality" />
          <Feature icon="minus-circle-outline" text="Ad-free viewing experience" />
          <Feature icon="download-circle-outline" text="Download to watch later" />
          <Feature icon="closed-caption-outline" text="Text of different languages" />
          <Feature icon="monitor-multiple" text="Stream on multiple devices" />
          <Feature icon="headphones" text="With the best audio quality" />
        </View>

        {/* Payment kısmı */}
        <TouchableOpacity activeOpacity={0.9} style={styles.paymentBtn}>
          <Text style={styles.paymentText}>Payment Method</Text>
        </TouchableOpacity>

 <Text style={styles.loginRow}>
          Already subscribed?{' '}
          <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
            Login
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VipScreen;

const Feature = ({ icon, text }: { icon: string; text: string }) => (
  <View style={styles.featureItem}>
    <View style={styles.featureIconWrap}>
      <Icon name={icon} size={18} color="#E7E7E7" />
    </View>
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    backgroundColor: '#181818' ,
  },

  topBar: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    
  },
  backBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },

  loginInline: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 18,
  marginBottom: 8,
},


  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
    marginTop: 70,
    marginBottom: 20,
       fontFamily: 'serif',
  },


  accessBtn: {
    alignSelf: 'center',
    marginTop: 18,
    backgroundColor: '#b2600eff',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 18,
  },
  accessBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
       fontFamily: 'serif',
  },

  subtitle: {
    marginTop: 16,
    color: '#EDEDED',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
     fontWeight: '600',
     fontFamily: 'serif',
    marginBottom: 30,
  },

  cardsRow: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: 12 as any, 
  },
  card: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 18,
     paddingHorizontal: 16,
      marginBottom: 40,
  },

  monthlyCard: {
    shadowColor: '#00bcd4',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  cardTitleLight: {
    color: '#F7FFFF',
    fontWeight: '800',
    fontSize: 14,
    marginBottom: 10,
      fontFamily: 'serif',
  },
  priceLight: {
    color: '#F7FFFF',
    fontWeight: '800',
    fontSize: 18,
      fontFamily: 'serif',
  },
  currencyLight: { fontSize: 12, opacity: 0.9 },
  periodLight: {
    color: '#EFFFFF',
    opacity: 0.9,
    marginTop: 2,
    fontSize: 12,
     fontWeight: '600',
      fontFamily: 'serif',
  },

  annualCard: {
    backgroundColor: '#181818',
    borderWidth: 1,
    borderColor: '#2D2A3A',
  },
  cardTitleDark: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
      marginBottom: 10,
      fontFamily: 'serif',
  },
  priceDark: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 18,
    fontFamily: 'serif',
  },
  currencyDark: { fontSize: 12, opacity: 0.9 },
  periodDark: {
    color: '#FFFFFF',
    opacity: 0.7,
     marginTop: 2,
    fontSize: 12,
       fontWeight: '600',
    fontFamily: 'serif',
  },

  featuresGrid: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
      rowGap: 14,
  },
  featureItem: {
    width: '48%',                
    flexDirection: 'row',
    alignItems: 'flex-start',     
      marginBottom: 6,
  },
  featureIconWrap: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#2A2736',
    alignItems: 'center',
    justifyContent: 'center',
      marginRight: 10,
      marginTop: 2,
  },
  featureText: {
    flex: 1,                  
    flexShrink: 1,                
    flexWrap: 'wrap',             
    color: '#E5E5E5',
    fontSize: 13,
    lineHeight: 18,
      fontFamily: 'serif',
  },

  paymentBtn: {
    marginTop: 32,
    backgroundColor: '#00bcd4',
    borderRadius: 24,
    paddingVertical: 14,
     alignItems: 'center',
  },

  paymentText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 15,
    letterSpacing: 0.2,
      fontFamily: 'serif',
  },

  loginRow: {
    textAlign: 'center',
    marginTop: 18,
    marginBottom: 8,
    color: '#9EA0A6',
     fontSize: 13,
      fontFamily: 'serif',
  },

  loginLink: {
    color: '#10D3E7',
     fontWeight: '700',
      fontFamily: 'serif',
      marginTop:10,
  } ,
});
