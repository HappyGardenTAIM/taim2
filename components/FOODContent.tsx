import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSeedling } from '@fortawesome/free-solid-svg-icons';

const FOODContent = () => {

  return (
    <View style={styles.container}>
        <Text style={styles.largeText}>Kasvata</Text>
        <FontAwesomeIcon icon={faSeedling} size={100} style={styles.icon} />
        <Text style={styles.introText}>
          Pane seeme mulda, anna talle päikesevalgust ja vett ning õige pea saad suhu pista midagi maitsvat!
        </Text>     
    </View>
  );
};

export default FOODContent;

const styles = StyleSheet.create({
  container: { 
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
  },
  icon: {
    marginTop: 30,
    marginBottom: 30,
  },
  largeText: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#93C385',
    marginHorizontal: 10,
    lineHeight: 35,
  },
  introText: {
    color: '#1C0F13',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
});
