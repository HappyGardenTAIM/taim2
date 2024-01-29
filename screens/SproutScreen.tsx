import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, View } from 'react-native';

const SPROUTScreen = ({ navigation }) => {

  const navigateToIWantToGrow = () => {
    // Navigate back to IWantToGrowScreen
    navigation.navigate('ChooseWhatToGrow' as never);
  };

  const navigateToIWantSprouts = () => {
    // Navigate to IWantTastyScreen
    navigation.navigate('SPROUTScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Picture or animation of germination */}
      {/* <Image source={require('./path-to-germination-image.png')} style={styles.germinationImage} /> */}

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

export default SPROUTScreen;