import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SPROUTContent = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.largeText}>Idanda</Text>
      <MaterialCommunityIcons name="seed-outline" size={100} color="black" margin={30}/>
      <Text style={styles.introText}>
      Lihtsaim ja kiireim viis kasvatada ise midagi värsket. Leota seemneid vees, loputa kaks korda päevas ja mõne päevaga ongi krõmpsud idud valmis!
      </Text>
    </View>
  );
};

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
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 30,
    marginVertical: 20,
  },
});

export default SPROUTContent;