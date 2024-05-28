import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, View, ImageBackground, Modal, ScrollView } from 'react-native';
import { gql, useQuery, useMutation } from '@apollo/client';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as SecureStore from 'expo-secure-store';
import NavigationButton from '../components/NavigationButton';
import HomeButton from '../components/HomeButton';

const CREATE_JOURNEY_MUTATION = gql`
  mutation CreateJourney($userId: Int!, $plantId: Int!, $type: PlantType!) {
    createJourney(data: {userId: $userId, plantId: $plantId, type: $type}) {
      user {
        name
      }
      plant {
        name
        image
      }
      id
    }
  }
`;

const PlantSelectionScreen = ({ navigation, route }) => {

  const { journeyType } = route.params;

  const GET_PLANT_INFO = gql`
    query Plants($type: PlantType!) {
      plants(type: $type) {
        ... on Sprout {
          id
          plant {
            id
            name
            image
            minGrowthTime
            maxGrowthTime
            difficulty
          }
          usage
          benefits
        }
        ... on Food {
          id
          plant {
            id
            name
            image
            minGrowthTime
            maxGrowthTime
            difficulty
            maintenance
          }
          light
          usage
          benefits
        }
        ... on Flower {
          id
          plant {
            id
            name
            image
            minGrowthTime
            maxGrowthTime
            difficulty
            maintenance
          }
          light
          appearance
          usage
        }
      }
    }
  `;  

  const [selectedPlant, setSelectedPlant] = useState(null);

  const { loading, error, data } = useQuery(GET_PLANT_INFO, {
    variables: { type: journeyType },
  });

  const [createJourney, {loading: mutationLoading, error: mutationError}] = useMutation(CREATE_JOURNEY_MUTATION);

  if (loading) {
    return <Text>Laadin...</Text>;
  }
  
  if (error) {
    return <Text>Tekkis viga: {error.message}</Text>;
  }

  if (mutationLoading) {
    return <Text>Loon õpiteed</Text>
  }

  if (mutationError) {
    return <Text>Õpitee loomine ebaõnnestus</Text>
  }

  const plants = data.plants;
  console.log(plants);

  const placeholder = require('../assets/taim.png');  

  const difficultyDisplayText = (difficulty) => {
    switch (difficulty) {
      case 'EASY':
        return 'Väga lihtne kasvatada.';
      case 'MEDIUM':
        return 'Lihtne kasvatada.';
      case 'HARD':
        return 'Natuke keerulisem kasvatada.';
      default:
        return null;
    }
  }; 

  const renderDifficultyIcons = (difficulty) => {
    switch (difficulty) {
      case 'EASY':
        return <Icon name="leaf" size={11} color="black" />;
      case 'MEDIUM':
        return (
          <>
            <Icon name="leaf" size={11} color="black" />
            <Icon name="leaf" size={11} color="black" />
          </>
        );
      case 'HARD':
        return (
          <>
            <Icon name="leaf" size={11} color="black" />
            <Icon name="leaf" size={11} color="black" />
            <Icon name="leaf" size={11} color="black" />
          </>
        );
      default:
        return null;
    }
  };

  const renderPopup = () => {
    if (!selectedPlant) return null;

    return (
      
      <Modal
        animationType="fade"
        transparent={true}
        visible={true}
        onRequestClose={() => setSelectedPlant(null)}
      >
        <TouchableOpacity
          style={styles.popupContainer}
          activeOpacity={1}
          onPress={() => setSelectedPlant(null)}
        >       
          <View style={styles.popUpTextBackground}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedPlant(null)}>
              <Icon name="times" size={20} color="black" />
            </TouchableOpacity>             
          
            <Text style={styles.imageTitle}>{selectedPlant.plant.name}</Text>
            <Text style={styles.popupText}>{difficultyDisplayText(selectedPlant.plant.difficulty)}</Text>
            <Text style={styles.popupText}>Valmis {selectedPlant.plant.minGrowthTime}-{selectedPlant.plant.maxGrowthTime} päevaga.</Text>
            {selectedPlant.benefits && (
              <Text style={styles.popupText}>{selectedPlant.benefits}</Text>
            )}
            {selectedPlant.usage && (
              <Text style={styles.popupText}>{selectedPlant.usage}</Text>
            )}
            {selectedPlant.appearance && (
              <Text style={styles.popupText}>{selectedPlant.appearance}</Text>
            )}
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleCreateJourneyPress}>
              <Text style={styles.buttonText}>Tahan seda kasvatada</Text>
            </TouchableOpacity>
          </View> 
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  const handleCreateJourneyPress = async () => {    
    
    try {
      const storedUserId = await SecureStore.getItemAsync('userId');
    
      if (!storedUserId) {
        console.error('User ID not found in SecureStore.');
        alert('Kasutaja ID puudub. Palun logi sisse.');
        return;
      }

      const userId = parseInt(storedUserId);
      console.log('User ID:', userId);
      
      const { data: mutationData } = await createJourney({ 
        variables: {
          userId: userId,
          plantId: selectedPlant.plant.id,
          type: journeyType,         
         },
      })

      console.log('Õpitee loodud', mutationData);
      navigation.navigate('JourneyScreen', { journeyId: mutationData.createJourney.id, plant: mutationData.createJourney.plant });
    } catch (error) {
      console.log('Mutation Error:', error);

      if (error.networkError && error.networkError.result) {
        console.log('Network Errors:', error.networkError.result.errors);
        alert('Õpitee loomine ebaõnnestus');
      } else {
        alert('Õpitee loomine ebaõnnestus');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView contentContainerStyle={styles.scrollView}>
        <HomeButton size={60}/>
        
        <Text style={styles.largeText}>Vali oma taim</Text>
        
        <View style={styles.imageContainer}>
          {plants.map((plant, index) => (
            <TouchableOpacity
              key={index}
              style={styles.plantContainer}
              onPress={() => setSelectedPlant(plant)}
            >     
              <ImageBackground
                defaultSource={placeholder}
                source={{ uri: plant.plant.image }}
                style={styles.plantImage}
                alt={plant.plant.name}
              >  
                <View style={styles.overlay}> 
                  <Text style={styles.imageTitle}>{plant.plant.name}</Text>
                  <View style={styles.infoContainer}>
                    <View style={styles.infoContainer}>
                      {renderDifficultyIcons(plant.plant.difficulty)}
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.imageText}>{plant.plant.minGrowthTime}-{plant.plant.maxGrowthTime} päeva</Text>   
                    </View>
                  </View>                                                        
                </View>

              </ImageBackground> 
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {renderPopup()}

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <NavigationButton
          buttons={[
            {
              label: 'Tahaks midagi muud',
              screenName: 'JourneySelection'
            },
          ]}
          buttonStyle={{width: '75%'}}
        />
      </View>
    </SafeAreaView>
  );
};

export default PlantSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  scrollView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {    
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 5,
    justifyContent: 'space-between',
    marginHorizontal: 30,
  },
  plantContainer: {
    width: '45%',
    alignItems: 'center',
  },
  plantImage: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 15,
    marginBottom: 40,
    overflow: 'hidden',
  },
  imageTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  popupText: {
    color: '#1C0F13',
    fontSize: 16,
    marginBottom: 10,        
  },
  popUpTextBackground: {
    backgroundColor: '#93C393',
    borderRadius: 30,
    padding: 20,
    width: '80%',
  },
  popupContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,    
  },
  imageText: {
    color: '#1C0F13',
    fontSize: 16,
    textAlign: 'right',
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,    
  },  
  overlay: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    width: 150,
    height: 150,
    borderRadius: 10,    
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#caffa8',
    padding: 15,
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    width: '100%',
  },
  buttonText: {
    color: '#1C0F13',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});