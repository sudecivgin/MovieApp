import React from 'react';
import { View, Text,  TouchableOpacity, StyleSheet, Image } from 'react-native';

const LoginScreen = () => {
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
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>                         
      </TouchableOpacity>
      
      <Text style={styles.Text}>
        I already have an account? 
        <Text style={styles.loginText}> Login</Text>

        
      </Text>
      <Text style={styles.login}> Or Sign up with </Text>
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
  backgroundColor: '#212121',
    alignItems: 'center',
},

  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom:20,
  },


  input: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    fontFamily:'serif',
  },

cinemax: {
  color:'#bbd0d1ff',
  fontFamily:'serif',
  fontSize:16,
  marginBottom:40,
textAlign: 'center',

},

  button: {
    backgroundColor: '#12CDD9',
    padding: 15,
    borderRadius: 50,
    marginTop: 10,
    width:390,

  },

  Text:{

    color: '#fff',
    fontFamily: 'serif',
    marginTop: 25,
    fontSize: 16, 

  },
  loginText:{
    color:'#12CDD9',
   
  },

  login:{
    marginBottom:50,
    fontFamily:'serif',
  color:'#bbd0d1ff',
  marginTop:50,

  
  },

  buttonText: {
    color: '#212121',
    textAlign: 'center',
    fontWeight: 'bold',
   fontFamily:'serif',
   fontSize: 16,
        
  },

});
