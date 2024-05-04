import React, { useEffect, useState } from 'react';
import { SafeAreaView, Image, StyleSheet, Text, View } from 'react-native';
import NavigationButton from '../components/NavigationButton';
import * as SecureStore from 'expo-secure-store';
import JourneySelector from '../components/JourneySelector';
import { useNavigation } from '@react-navigation/native';

const UserHomeScreen: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const navigation = useNavigation();

  const fetchUserName = async () => {
    try {
      const storedUserName = await SecureStore.getItemAsync('userName');
      console.log('Username:', storedUserName)
      if (!storedUserName) {
        console.error('User name not found in SecureStore.');
        return '';
      }
      return storedUserName;
    } catch (error) {
      console.error('Error fetching user name:', error);
      return '';
    }
  };

  useEffect(() => {
    fetchUserName().then((name) => setUserName(name));
  }, []);

  const handleJourneysExistence = (hasJourneys: boolean) => {
    if (!hasJourneys) {
      // Redirect to JourneySelectionScreen if no journeys exist
      navigation.navigate('JourneySelection' as never);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={require('../assets/taim.png')} style={styles.splashImage}/>
        <Text style={styles.largeText}>{userName ? `Tere, ${userName}!` : 'Tere!'}</Text>
      </View>
      <View style={styles.journeyContainer}>
        <JourneySelector onJourneysExistence={handleJourneysExistence} />
      </View>
      <View style={styles.bottomContainer}>
        <NavigationButton 
          buttons={[
            { label: 'Tahan uut taime', screenName: 'JourneySelection' },
            { label: 'Kasvatatud taimed', screenName: 'CompletedJourneysScreen'}
          ]}
          buttonStyle={styles.choosePlantButton} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  topContainer: {
    alignItems: 'center',
    paddingTop: 10,
  },
  splashImage: {
    width: 175,
    height: 175,
    marginBottom: 10,
  },
  largeText: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#93C385',
    marginVertical: 10,
  },
  journeyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    paddingBottom: 35,
    alignItems: 'center',
  },
  choosePlantButton: {
    width: '70%',
  },
});

export default UserHomeScreen;