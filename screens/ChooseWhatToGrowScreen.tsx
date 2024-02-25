import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { gql, useQuery } from '@apollo/client';
import * as SecureStore from 'expo-secure-store';

const GET_JOURNEY_TYPES = gql`
  query GetJourneyTypes {
    journeyTypes
  }
`;

const journeyTypeDisplayText = {
  SPROUT: 'Idusid',
  FOOD: 'Midagi maitsvat',
  FLOWER: 'Midagi ilusat',
};

const ChooseWhatToGrowScreen = () => {

  const navigation = useNavigation();

  const [userName, setUserName] = useState('');

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

  const { loading, error, data } = useQuery(GET_JOURNEY_TYPES);

  // const checkAndNavigate = async () => {
  //   const storedJourneyType = await AsyncStorage.getItem('selectedJourney');
  //   if (storedJourneyType) {
  //     navigation.navigate(`${storedJourneyType}Screen` as never);
  //   }
  // };

  // useEffect(() => {
  //   checkAndNavigate();
  // }, []);

  // if (loading) return <Text>Laen andmeid...</Text>;
  // if (error) return <Text>Error: {error.message}</Text>;

  const journeyTypes = data?.journeyTypes;
  
  const navigateToJourney = (journeyType) => {
    storeJourneyType(journeyType);
    navigation.navigate(`${journeyType}Screen` as never);
  };

  const storeJourneyType = async (journeyType) => {
    try {
      await AsyncStorage.setItem('selectedJourney', journeyType);
    } catch (error) {
      console.error('Error storing journey type:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* User's image and data */}
      <View style={styles.userDataContainer}>
        <Image source={require('../assets/taim.png')} style={styles.userImage} />
        <Text style={styles.userName}>{userName ? `Tere, ${userName}!` : 'Tere!'}</Text>
      </View>

      {/* Text "Tahan kasvatada" */}
      <Text style={styles.growText}>Tahan kasvatada</Text>

      {/* Buttons */}
      {journeyTypes && journeyTypes.map((journeyType) => (
          <TouchableOpacity
            key={journeyType}            
            style={styles.buttonContainer}
            onPress={() => navigateToJourney(journeyType)}
          >
            <Text style={styles.buttonText}>{`${journeyTypeDisplayText[journeyType]}`}</Text>
          </TouchableOpacity>
      ))}
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
    color: '#93C385',
    fontSize: 28,
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