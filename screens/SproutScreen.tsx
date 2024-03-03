import React from 'react';
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';
import NavigationButton from '../components/NavigationButton';

const SPROUTScreen = () => {

  const buttonConfigurations = [
    { label: 'Valin midagi muud', screenName: 'ChooseWhatToGrow' },
    { label: 'Tahan idusid', screenName: 'SelectSproutScreen' },
  ];

  return (
    <SafeAreaView style={styles.flexContainer}>
      {/* Picture or animation of germination */}
      <View style={styles.container}>
        <Text style={styles.germinateText}>Idanda</Text>
        <Text style={styles.introText}>
          [Siia tuleb lühike idandamist tutvustav tekst.]
        </Text>
      </View>
      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <NavigationButton buttons={buttonConfigurations} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
  },
  container: { 
    alignItems: 'center',
  },
  germinationImage: {
    width: '100%',
    height: '30%',
    resizeMode: 'cover',
  },
  germinateText: {
    color: '#1C0F13',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  introText: {
    color: '#1C0F13',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
});

export default SPROUTScreen;