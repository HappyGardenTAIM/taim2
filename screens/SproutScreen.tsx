import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import NavigationButton from '../components/NavigationButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeButton from '../components/HomeButton';

const SPROUTScreen = () => {

  const buttonConfigurations = [
    { label: 'Valin midagi muud', screenName: 'JourneySelection' },
    { label: 'Tahan idusid', screenName: 'SelectSproutScreen' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      
      <HomeButton />
      
      <Text style={styles.largeText}>Idanda</Text>
      <MaterialCommunityIcons name="seed-outline" size={100} color="black" margin={30}/>
      <Text style={styles.introText}>
      Lihtsaim ja kiireim viis kasvatada ise midagi värsket. Leota seemneid vees, loputa kaks korda päevas ja mõne päevaga ongi krõmpsud idud valmis!
      </Text>

      {/* Buttons */}       
      <NavigationButton buttons={buttonConfigurations}
      buttonStyle={styles.button}
      containerStyle={{flexDirection: 'row'}}/>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#93C392',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    width: '45%',
  },
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
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 30,
    marginVertical: 20,
  },
});

export default SPROUTScreen;