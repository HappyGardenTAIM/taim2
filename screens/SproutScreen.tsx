import React from 'react';
import { SafeAreaView, Image, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SproutScreen = () => {
  const navigation = useNavigation();

  const navigateToIWantToGrow = () => {
    // Navigate back to IWantToGrowScreen
    navigation.navigate('ChooseWhatToGrowScreen');
  };

  const navigateToIWantSprouts = () => {
    // Navigate to IWantTastyScreen
    navigation.navigate('StartSproutingScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Picture or animation of germination */}
      <Image source={require('./path-to-germination-image.png')} style={styles.germinationImage} />

      {/* Text "Germinate" */}
      <Text style={styles.germinateText}>Idanda</Text>

      {/* Text introducing germination */}
      <Text style={styles.introText}>
        [Siia tuleb lühike idandamist tutvustav tekst.]
      </Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={navigateToIWantToGrow}>
          <Text style={styles.buttonText}>Valin midagi muud</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={navigateToIWantSprouts}>
          <Text style={styles.buttonText}>Tahan idusid</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SproutScreen;