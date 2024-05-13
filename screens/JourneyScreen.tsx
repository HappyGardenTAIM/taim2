import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Journey from '../components/Journey';
import HomeButton from '../components/HomeButton';
import Icon from 'react-native-vector-icons/FontAwesome';

const JourneyScreen = ( { route, navigation }) => {

  return (
      <View style={styles.container}>
          <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate('UserHomeScreen')}>
            <Icon name="times" size={20} color="black" />
          </TouchableOpacity>
          <HomeButton size={170} />
          <Journey route={route}  />
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
    closeButton: {
        position: 'absolute',
        top: 15,
        right: 30,
    },
});

export default JourneyScreen;