import React from 'react';
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';
import NavigationButton from '../components/NavigationButton';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSeedling } from '@fortawesome/free-solid-svg-icons';
import HomeButton from '../components/HomeButton';

const FOODScreen = () => {

  const buttonConfigurations = [
    { label: 'Valin midagi muud', screenName: 'JourneySelection' },
    { label: 'Tahan taime', screenName: 'SelectFoodScreen' },
  ];

  return (
    <SafeAreaView style={styles.container}>

      <HomeButton />
      
      
        <Text style={styles.largeText}>Kasvata</Text>
        <FontAwesomeIcon icon={faSeedling} size={100} style={styles.icon} />
        <Text style={styles.introText}>
          Pane seeme mulda, anna talle päikesevalgust ja vett ning õige pea saad suhu pista midagi maitsvat!
        </Text>
      
      {/* Buttons */}
      
      <NavigationButton buttons={buttonConfigurations}
      buttonStyle={styles.button}
      containerStyle={{flexDirection: 'row'}}/>
     
    </SafeAreaView>
  );
};

export default FOODScreen;

const styles = StyleSheet.create({
  container: { 
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
  },
  icon: {
    marginTop: 30,
    marginBottom: 30,
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
  introText: {
    color: '#1C0F13',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#93C392',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    width: '45%',
  },
});
