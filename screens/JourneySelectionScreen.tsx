import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { gql, useQuery } from '@apollo/client';
import * as SecureStore from 'expo-secure-store';
import HomeButton from '../components/HomeButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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

const JourneySelectionScreen = () => {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Fetch user name from SecureStore for displaying a greeting

  const [userName, setUserName] = useState('');

  const fetchUserName = async () => {
    try {
      const storedUserName = await SecureStore.getItemAsync('userName');
      console.log('Username:', storedUserName)
      if (!storedUserName) {
        console.log('User name not found in SecureStore.');
        return '';
      }
      return storedUserName;
    } catch (error) {
      console.log('Error fetching user name:', error);
      return '';
    }
  };
    
  useEffect(() => {
    fetchUserName().then((name) => setUserName(name));
  }, []);


  // Fetch journey types from the server

  const { loading, error, data } = useQuery(GET_JOURNEY_TYPES);

  if (loading) return <Text>Laen andmeid...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;    

  const journeyTypes = data?.journeyTypes;


  // Store the selected journey type and navigate to the selected journey type screen
  
  const navigateToJourney = (journeyType: string) => {
    storeJourneyType(journeyType);
    navigation.navigate('JourneyInfoScreen', { journeyType });
  };

  const storeJourneyType = async (journeyType) => {
    try {
      await AsyncStorage.setItem('selectedJourney', journeyType);
    } catch (error) {
      console.log('Error storing journey type:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View >
          <HomeButton size={200}/>
        </View>
          <Text style={styles.largeText}>{userName ? `Tere, ${userName}!` : 'Tere!'}</Text>
        
          <Text style={styles.text}>Tahan kasvatada</Text>
        
          {/* Buttons */}
          {journeyTypes && journeyTypes.map((journeyType) => (
            <TouchableOpacity
              key={journeyType}            
              style={styles.button}
              onPress={() => navigateToJourney(journeyType)}
            >
              <Text style={styles.buttonText}>{`${journeyTypeDisplayText[journeyType]}`}</Text>
            </TouchableOpacity>
          ))}
        
      </ScrollView>      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  scrollView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
    marginTop: 30,
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
  text: {
    fontSize: 22,
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#93C392', 
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '75%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#1C0F13',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default JourneySelectionScreen;