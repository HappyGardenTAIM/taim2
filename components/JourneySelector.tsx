import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
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
        endDate
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
  userId: number | null;
}

const JourneySelector: React.FC<JourneySelectorProps> = ({ userId }) => {
  
  const [inProgressJourneys, setinProgressJourneys] = useState<Journey[]>([]);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  useEffect(() => {
    if (userId !== null) {
      // If userId is available, execute the query
      refetch();
    }
  }, [userId]);  

  const { loading, error, data, refetch } = useQuery(GET_USER_JOURNEYS, {
    variables: { userId },
    skip: userId === null,
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (data) {
      const journeys = data?.user?.journeys || [];
      const inProgressJourneys = journeys.filter((journey) => journey.endDate == null);
      setinProgressJourneys(inProgressJourneys);
    }
  }, [data]);

  if (loading) return <Text>Laadin...</Text>;
  if (error) return <Text>Tekkis viga: {error.message}</Text>;

  const handleJourneySelect = (journeyId: number) => {
    navigation.navigate('JourneyScreen', { journeyId });
    console.log('Selected Journey ID:', journeyId);
  };

  return (
    <View style={styles.container}>
      {inProgressJourneys.length > 0 ? (
        <View style={styles.journeySelectorContainer}>
          <Text style={styles.title}>Minu taimed</Text>
          <View style={styles.journeyIdContainer}>
            {inProgressJourneys.map((journey, index) => (
              <TouchableOpacity 
                key={journey.id} 
                style={styles.journeyId} 
                onPress={() => handleJourneySelect(journey.id)}>
                <Image source={{ uri: journey.plant.image }} style={styles.plantImage} />
                <Text style={styles.journeyIdText}>{journey.plant.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <NavigationButton 
          buttons={[
            { label: 'Tahan uut taime', screenName: 'JourneySelection' },
          ]}
          buttonStyle={styles.choosePlantButton} />
        </View>
      ) : (
        <View style={styles.journeyContainer}>
        <Text style={styles.noPlantText}>Sul ei ole praegu ühtegi taime</Text>
        <View style={styles.bottomContainer}>
          <NavigationButton 
            buttons={[{ label: 'Vali endale taim', screenName: 'JourneySelection' }]}
            buttonStyle={styles.choosePlantButton} />
        </View>
        </View>
      )}
    </View>
  )
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