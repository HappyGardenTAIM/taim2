import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import NavigationButton from '../components/NavigationButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FLOWERScreen = () => {

  const buttonConfigurations = [
    { label: 'Valin midagi muud', screenName: 'ChooseWhatToGrow' },
    { label: 'Tahan lille', screenName: 'SelectFlowerScreen' },
  ];

  return (
    <SafeAreaView style={styles.container}>

      <MaterialCommunityIcons name="flower" size={100} color="black" marginTop={60} marginBottom={30}/>
      
        <Text style={styles.largeText}>Kasvata</Text>
        <Text style={styles.introText}>
          Kui seeme on mullas, on vaja vaid päikest, vett ja veidi kannatlikkust. Peagi saad tasuks imetleda kauneid õisi!
        </Text>
      
      {/* Buttons */}
      
      <NavigationButton buttons={buttonConfigurations} 
      buttonStyle={styles.button}
      containerStyle={{flexDirection: 'row'}}
      />
      
    </SafeAreaView>
  );
};

export default FLOWERScreen;

const styles = StyleSheet.create({
  container: { 
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
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