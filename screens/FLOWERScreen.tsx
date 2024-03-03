import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import NavigationButton from '../components/NavigationButton';

const FLOWERScreen = () => {

  const buttonConfigurations = [
    { label: 'Valin midagi muud', screenName: 'ChooseWhatToGrow' },
    { label: 'Tahan taime', screenName: 'SelectFlowerScreen' },
  ];

  return (
    <SafeAreaView style={styles.flexContainer}>
    {/* Picture or animation of food plant */}
    <View style={styles.container}>
      <Text style={styles.growText}>Kasvata</Text>
      <Text style={styles.introText}>
        [Siia tuleb lühike tutvustav tekst kasvatamise kohta]
        </Text>
      </View>
      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <NavigationButton buttons={buttonConfigurations} />
      </View>
    </SafeAreaView>
  );
};

export default FLOWERScreen;

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
  },
  container: { 
    alignItems: 'center',
  },
  growText: {
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