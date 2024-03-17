import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import HomeButton from '../components/HomeButton';

const JourneyScreen = () => {
  return (
      <View style={styles.container}>
          <HomeButton/>
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 16,
    },
});

export default JourneyScreen;