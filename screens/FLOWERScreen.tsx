import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const FLOWERScreen = ({ navigation }) => {

  const navigateToIWantToGrow = () => {
    // Navigate back to IWantToGrowScreen
    navigation.navigate('ChooseWhatToGrow');
  };

  const navigateToIWantPretty = () => {
    // Navigate to IWantTastyScreen
    navigation.navigate('SelectFlowerScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Picture or animation of something pretty */}
      {/* <Image source={require('./path-to-pretty-image.png')} style={styles.prettyImage} /> */}

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

        <TouchableOpacity style={styles.button} onPress={navigateToIWantPretty}>
          <Text style={styles.buttonText}>Tahan taime</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FLOWERScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  germinationImage: {
    width: '100%',
    height: '30%',
    resizeMode: 'cover',
  },
  growText: {
    color: '#1C0F13',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  introText: {
    color: '#1C0F13',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    backgroundColor: '#93C392',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    width: '45%',
  },
  buttonText: {
    color: '#1C0F13',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


