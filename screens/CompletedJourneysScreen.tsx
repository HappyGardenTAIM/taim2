import { gql, useQuery } from '@apollo/client';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, Text, StyleSheet, ScrollView, ImageBackground, View } from 'react-native';
import HomeButton from '../components/HomeButton';
import NavigationButton from '../components/NavigationButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const GET_COMPLETED_JOURNEYS = gql`
  query CompletedJourneys($userId: Int!) {
    user(id: $userId) {
      completedJourneys {
        id
        startedAt
        endDate
        plant {
          id
          name
          image
        }
      }
    }
  }
`;

const CompletedJourneysScreen = () => {
  
  const [completedJourneys, setCompletedJourneys] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = async () => {
      const id = await SecureStore.getItemAsync('userId');
      setUserId(parseInt(id));
    };
    userId();
  }, []);

  console.log('User ID:', userId);

  const { data } = useQuery(GET_COMPLETED_JOURNEYS, {
    variables: { userId },
    onCompleted: (data) => {
      setCompletedJourneys(data?.user?.completedJourneys || []);
      setLoading(false);
    },
    onError: (error) => {
      setError(error);
      setLoading(false);
      console.error('Error fetching completed journeys:', error);
    },
  });

  const placeholder = require('../assets/taim.png');

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  
  const handlePress = (journeyId: number) => {
    navigation.navigate('JourneyScreen', { journeyId });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <HomeButton size={200} />
        <Text style={styles.largeText}>Sinu kasvatatud taimed</Text> 
        <View>
          {loading ? (
            <Text>Laadin...</Text>
          ) : error ? (
            <Text>Tekkis viga: {error.message}</Text>
          ) : completedJourneys.length === 0 ? (
            <View>
              <Text style={styles.imageText}>Ei ole veel ühtegi taime.</Text>
              <NavigationButton 
                buttons={[
                  {
                    label: 'Hakka kasvatama!', 
                    screenName: 'JourneySelection',
                  }
                ]}
              />
            </View>
          ) : (
            completedJourneys.map((journey, index) => (
            <TouchableOpacity 
              key={journey.id}
              style={styles.plantContainer}
              onPress={() => handlePress(journey.id)}
            >
              <ImageBackground
                defaultSource={placeholder}
                source={{ uri: journey.plant.image }}
                style={styles.plantImage}
                alt={journey.plant.name}
              >
                <View style={styles.overlay}>
                  <Text style={styles.imageTitle}>{journey.plant.name}</Text>
                  <View style={styles.infoContainer}>                  
                    <View style={{ flex: 1 }}>
                      <Text style={styles.imageText}>Algus: {new Date (journey.startedAt).toLocaleDateString()}{'\n'}Lõpp: {new Date (journey.endDate).toLocaleDateString()}</Text>
                    </View>
                  </View>
                </View>

              </ImageBackground>
            </TouchableOpacity>
          ))
        )}
      </View>       
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
  },
  plantContainer: {
    width: '45%',
    alignItems: 'center',
  },
  imageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  },
  scrollView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeText: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 40,
    color: '#93C385',
    marginHorizontal: 10,
    lineHeight: 35,
  },
  plantImage: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 15,
    marginBottom: 40,
    overflow: 'hidden',
  },
  overlay: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    width: 150,
    height: 150,
    borderRadius: 10,    
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,    
  },
  imageText: {
    color: '#1C0F13',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
});

export default CompletedJourneysScreen;