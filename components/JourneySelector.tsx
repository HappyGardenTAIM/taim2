import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import NavigationButton from './NavigationButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const GET_USER_JOURNEYS = gql`
  query UserJourneys($userId: Int!) {
    user(id: $userId) {
      id
      journeys {
        id
        startedAt
        plant {
          name
          image
        }
      }
    }
  }
`;

interface Plant {
  name: string;
  image: string;
}

interface Journey {
  id: number;
  startedAt: Date;
  plant: Plant;
}

interface JourneySelectorProps {
  onJourneysExistence: (hasJourneys: boolean) => void;
}

const JourneySelector: React.FC<JourneySelectorProps> = ({ onJourneysExistence }) => {
  const [user, setUser] = useState(null);
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const { loading: journeysLoading, error: journeysError, data: journeysData, refetch } = useQuery(GET_USER_JOURNEYS, {
    variables: { userId: user },
  });
  
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await SecureStore.getItemAsync('userId');
        if (storedUser) {
          setUser(parseInt(storedUser));
          console.log('User ID set in selector:', parseInt(storedUser));
        } else {
          console.error('User ID not found in SecureStore.');
          navigation.navigate('WelcomeScreen' as never);
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserData();

  }, []);

  useEffect(() => {
    if (journeysData && journeysData.user) {
      const userHasJourneys = journeysData.user.journeys.length > 0;
      setJourneys(journeysData.user.journeys);
      // Inform UserHomeScreen about the existence of journeys
      onJourneysExistence(userHasJourneys);
    } else if (!journeysLoading) {
      // Inform UserHomeScreen that no journeys are found
      onJourneysExistence(false);
      // Navigate to JourneySelectionScreen if no journeys are found
      navigation.navigate('JourneySelection' as never);
    }
  }, [journeysData, journeysLoading, onJourneysExistence]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch();
    });

    return unsubscribe;
  }, [navigation, refetch]);

  const handleJourneySelect = (journeyId: number) => {
    navigation.navigate('JourneyScreen', { journeyId });
    console.log('Selected Journey ID:', journeyId);
  };

  return (
    <View style={styles.container}>
      {journeys.length > 0 ? (
        <View style={styles.journeySelectorContainer}>
          <Text style={styles.title}>Minu taimed</Text>
          <View style={styles.journeyIdContainer}>
            {journeys.map((journey, index) => (
              <TouchableOpacity 
                key={journey.id} 
                style={styles.journeyId} 
                onPress={() => handleJourneySelect(journey.id)}>
                <Image source={{ uri: journey.plant.image }} style={styles.plantImage} />
                <Text style={styles.journeyIdText}>{journey.plant.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.journeyContainer}>
        <Text style={styles.noPlantText}>Sul ei ole veel ühtegi taime</Text>
        <View style={styles.bottomContainer}>
          <NavigationButton 
            buttons={[{ label: 'Vali endale taim', screenName: 'JourneySelection' }]}
            buttonStyle={styles.choosePlantButton} />
        </View>
      </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  journeySelectorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'black',
  },
  journeyIdContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  journeyId: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  plantImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  journeyIdText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
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
  noPlantText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  choosePlantButton: {
    width: '70%',
  },
});


export default JourneySelector;