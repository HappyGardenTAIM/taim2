import React from 'react';
import { SafeAreaView, View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ChooseWhatToGrowScreen = () => {
  // Mock user data
  const userData = {
    name: 'Olen Taim',
    image: require('./path-to-user-image.png'), // Replace with the actual path to the user's image
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
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Midagi maitsvat</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Midagi ilusat</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Idusid</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ChooseWhatToGrowScreen;