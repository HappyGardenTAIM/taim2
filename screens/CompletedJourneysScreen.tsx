import { gql, useQuery } from '@apollo/client';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, Text, StyleSheet, ScrollView, ImageBackground, View } from 'react-native';
import HomeButton from '../components/HomeButton';
import NavigationButton from '../components/NavigationButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const GET_JOURNEYS = gql`
  query Journeys($userId: Int!) {
    user(id: $userId) {
      journeys {
        id
        startedAt
        endDate
        plant {
          id
          name
          image
        }
        status
        updatedAt
      }
    }
  }
`;

const CompletedJourneysScreen = () => {
  
  const [completedJourneys, setCompletedJourneys] = useState([]);
  const [userId, setUserId] = useState(null);
  const [abandonedJourneys, setAbandonedJourneys] = useState([]);

  useEffect(() => {
    const userId = async () => {
      try {
        const id = await SecureStore.getItemAsync('userId');
        setUserId(parseInt(id));
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    userId();
  }, []);

  useEffect(() => {
    refetch();
  }, [userId]);

  const { data, loading, error, refetch } = useQuery(GET_JOURNEYS, {
    variables: { userId },
    skip: userId === null,
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (data) {
      const journeys = data?.user?.journeys || [];
      const completedJourneys = journeys.filter((journey) => journey.endDate !== null);
      const abandonedJourneys = journeys.filter((journey) => journey.status === 'ABANDONED');
      setCompletedJourneys(completedJourneys);
      setAbandonedJourneys(abandonedJourneys);
    }
  }, [data]);

  const placeholder = require('../assets/taim.png');

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  
  const handlePress = (journeyId: number) => {
    navigation.navigate('JourneyScreen', { journeyId: journeyId, hideModal:true }, );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <HomeButton size={200} />
        <Text style={styles.largeText}>Sinu kasvatatud taimed</Text> 
        <View>
          <Text style={styles.title}>Lõpetatud õpiteed</Text>
          <View style={styles.imageContainer}>
            {loading ? (
              <Text>Laadin...</Text>
            ) : error ? (
              <Text>Tekkis viga: {error.message}</Text>
            ) : completedJourneys.length === 0 ? (
              <View>
                <Text style={styles.imageText}>Läbitud õpiteid ei ole</Text>
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
                          <Text style={styles.imageText}>Alustatud: {new Date (journey.startedAt).toLocaleDateString()}{'\n'}Lõpetatud: {new Date (journey.endDate).toLocaleDateString()}</Text>
                        </View>
                      </View>
                    </View>
                  </ImageBackground>                
                </TouchableOpacity>              
              ))
            )}
          </View>
        </View>
      <View>
        <Text style={styles.title}>Katkestatud õpiteed</Text>
        <View style={styles.imageContainer}>
          {loading ? (
            <Text>Laadin...</Text>
          ) : error ? (
            <Text>Tekkis viga: {error.message}</Text>
          ) : abandonedJourneys.length === 0 ? (
            null
          ) : (
            abandonedJourneys.map((journey, index) => (            
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
                      <Text style={styles.imageText}>Alustatud: {new Date (journey.startedAt).toLocaleDateString()}{'\n'}Katkestatud: {new Date (journey.updatedAt).toLocaleDateString()}</Text>
                    </View>
                  </View>
                </View>

                </ImageBackground>
              </TouchableOpacity>
            ))
          )}
        </View>
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
    marginHorizontal: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'black',
    alignSelf: 'center',
  },
  imageContainer: {    
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 5,
    justifyContent: 'space-between',
    marginHorizontal: 30,
  },
});

export default CompletedJourneysScreen;