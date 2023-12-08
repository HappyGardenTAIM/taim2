import React from 'react';
import { SafeAreaView, Image, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SomethingPrettyScreen = () => {
  const navigation = useNavigation();

  const navigateToIWantToGrow = () => {
    // Navigate back to IWantToGrowScreen
    navigation.navigate('ChooseWhatToGrowScreen');
  };

  const navigateToIWantTasty = () => {
    // Navigate to IWantTastyScreen
    navigation.navigate('StartGrowingPrettyScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Picture or animation of something pretty */}
      <Image source={require('./path-to-pretty-image.png')} style={styles.prettyImage} />

      {/* Text "Grow" */}
      <Text style={styles.growText}>Kasvata</Text>

      {/* Short descriptive introduction */}
      <Text style={styles.introText}>
        [Siia tuleb lühike tutvustav tekst kasvatamise kohta]
      </Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={navigateToIWantToGrow}>
          <Text style={styles.buttonText}>Valin midagi muud</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={navigateToIWantTasty}>
          <Text style={styles.buttonText}>Tahan taime</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SomethingPrettyScreen;


