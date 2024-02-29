import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SproutJourneyScreen = () => {
  return (
      <View style={styles.container}>
          <Image source={require('../assets/taim.png')} style={styles.image} />
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

export default SproutJourneyScreen;