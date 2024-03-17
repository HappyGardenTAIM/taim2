import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FLOWERContent = () => {

  return (
    
    <View style={styles.container}>      
        <Text style={styles.largeText}>Kasvata</Text>
        <MaterialCommunityIcons name="flower" size={100} color="black" marginTop={10} marginBottom={30}/>
        <Text style={styles.introText}>
          Kui seeme on mullas, on vaja vaid päikest, vett ja veidi kannatlikkust. Peagi saad tasuks imetleda kauneid õisi!
        </Text>      
    </View>
  );
};

export default FLOWERContent;

const styles = StyleSheet.create({
  container: { 
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
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