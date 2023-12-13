import React from 'react';
import { SafeAreaView, View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const ChooseWhatToGrowScreen = () => {
  const navigation = useNavigation();

  // Mock user data
  const userData = {
    name: 'Olen Taim',
    image: require('../assets/taim.png'),
  };

  const navigateToSomethingTasty = () => {
    navigation.navigate('SomethingTastyScreen' as never); 
  };

  const navigateToSomethingPretty = () => {
    navigation.navigate('SomethingPrettyScreen' as never); 
  };

  const navigateToSprouts = () => {
    navigation.navigate('SproutScreen' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* User's image and data */}
      <View style={styles.userDataContainer}>
        <Image source={userData.image} style={styles.userImage} />
        <Text style={styles.userName}>{userData.name}</Text>
      </View>

      {/* Text "Tahan kasvatada" */}
      <Text style={styles.growText}>Tahan kasvatada</Text>

      {/* Buttons */}
      <TouchableOpacity style={styles.buttonContainer} onPress={navigateToSomethingTasty}>
        <Text style={styles.buttonText}>Midagi maitsvat</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer} onPress={navigateToSomethingPretty}>
        <Text style={styles.buttonText}>Midagi ilusat</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer} onPress={navigateToSprouts}>
        <Text style={styles.buttonText}>Idusid</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDataContainer: {
    alignItems: 'center',
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    color: '#1C0F13',
    fontSize: 18,
    fontWeight: 'bold',
  },
  growText: {
    color: '#1C0F13',
    fontSize: 20,
    marginVertical: 10,
  },
  buttonContainer: {
    backgroundColor: '#93C392', 
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#1C0F13',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ChooseWhatToGrowScreen;