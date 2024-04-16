import React, { useEffect, useState } from 'react';
import { SafeAreaView, Image, StyleSheet, Text, View } from 'react-native';
import NavigationButton from '../components/NavigationButton';
import * as SecureStore from 'expo-secure-store';

const UserHomeScreen = () => {

  const [userName, setUserName] = useState('');  

  const fetchUserName = async () => {
    try {
      const storedUserName = await SecureStore.getItemAsync('userName');
      console.log('Username:', storedUserName)
      if (!storedUserName) {
        console.error('User name not found in SecureStore.');
        return '';
      }
      return storedUserName;
    } catch (error) {
      console.error('Error fetching user name:', error);
      return '';
    }
  };
    
  useEffect(() => {
    fetchUserName().then((name) => setUserName(name));
  }, []);

  const buttonConfigurations = [    
    { label: 'Minu teekond', screenName: 'JourneyScreen' },
    { label: 'Uus teekond', screenName: 'JourneySelection' },
    // { label: 'Minu taimed', screenName: 'FLOWERScreen' },
    { label: 'Minu seaded', screenName: 'UserHomeScreen' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/taim.png')} style={styles.splashImage}/>
      <Text style={styles.largeText}>{userName ? `Tere, ${userName}!` : 'Tere!'}</Text>
      <View style={styles.buttonContainer}>
        <NavigationButton 
          buttons={buttonConfigurations}
          buttonStyle={{width: '70%'}} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'F5F5F5',
  },
  buttonContainer: {
    width: '75%',
    marginTop: 25,
  },
  splashImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
    marginTop: 30,
  },
  largeText: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#93C385',
    marginHorizontal: 10,
    lineHeight: 35,
  },
});

export default UserHomeScreen;