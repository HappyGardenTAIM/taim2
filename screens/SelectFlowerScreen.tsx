import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, View, Image, ImageBackground, Modal } from 'react-native';
import { gql, useQuery, useMutation } from '@apollo/client';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as SecureStore from 'expo-secure-store';
import NavigationButton from '../components/NavigationButton';

const GET_PLANT_INFO = gql`
  query GetPlantInfo($type: PlantType!) {
    plantList(type: $type) {
      id
      name
      image
      difficulty
      minGrowthTime
      maxGrowthTime
      flower {
        usage
        appearance
      }
    }
  }
`;

const CREATE_JOURNEY_MUTATION = gql`
  mutation CreateJourney($userId: Int!, $plantId: Int!) {
    createJourney(data: {userId: $userId, plantId: $plantId}) {
      user {
        name
      }
      plant {
        name
      }
    }
  }
`;

const SelectFlowerScreen = ({ navigation }) => {

  const [selectedPlant, setSelectedPlant] = useState(null);

  const { loading, error, data } = useQuery(GET_PLANT_INFO, {
    variables: { type: 'FLOWER' },
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
  


  const plantList = data.plantList;
  console.log(plantList);

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
          
            <Text style={styles.imageTitle}>{selectedPlant.name}</Text>
            <Text style={styles.popupText}>{difficultyDisplayText(selectedPlant.difficulty)}</Text>
            <Text style={styles.popupText}>Valmis {selectedPlant.minGrowthTime} - {selectedPlant.maxGrowthTime} päevaga.</Text>
            {selectedPlant.flower.appearance && (
              <Text style={styles.popupText}>{selectedPlant.flower.appearance}</Text>
            )}
            {selectedPlant.flower.usage && (
              <Text style={styles.popupText}>{selectedPlant.flower.usage}</Text>
            )}            
          </View>
          <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleCreateJourneyPress}>
                <Text style={styles.buttonText}>Tahan seda kasvatada</Text>
              </TouchableOpacity>
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
          plantId: selectedPlant.id,         
         },
      })

      console.log('Õpitee loodud', mutationData);
      navigation.navigate('SproutJourneyScreen');
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
      {/* Picture or animation of something sprouting */}

      <Text style={styles.header}>Vali oma taim</Text>
      
      <View style={styles.imageContainer}>
        {plantList.map((plant, index) => (
          <TouchableOpacity
            key={index}
            style={styles.plantContainer}
            onPress={() => setSelectedPlant(plant)}
          >     
            <ImageBackground
              defaultSource={placeholder}
              source={{ uri: plant.image }}
              style={styles.plantImage}
              alt={plant.name}
            >  
              <View style={styles.overlay}> 
                <Text style={styles.imageTitle}>{plant.name}</Text>
                <View style={styles.infoContainer}>
                  {renderDifficultyIcons(plant.difficulty)}   
                </View>   
                <Text style={styles.imageText}>{plant.minGrowthTime} - {plant.maxGrowthTime} päeva</Text>                                     
              </View>

            </ImageBackground> 
          </TouchableOpacity>
        ))}
      </View>

      {renderPopup()}

      {/* Buttons */}
      <View style={styles.buttonContainer}>
      <NavigationButton
        buttons={[
          {
            label: 'Valin midagi muud',
            screenName: 'ChooseWhatToGrow'
          },
        ]}
      />
      </View>
    </SafeAreaView>
  );
};

export default SelectFlowerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#F5F5F5',   
    justifyContent: 'center',
  },
  germinationImage: {
    width: '100%',
    height: '30%',
    resizeMode: 'cover',
  },
  header: {
    color: '#1C0F13',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  introText: {
    color: '#1C0F13',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  imageContainer: {    
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
    justifyContent: 'space-evenly',
  },
  plantContainer: {
    width: '45%',
    alignItems: 'center',
  },
  plantImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  imageTitle: {
    color: '#1C0F13',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  popupText: {
    color: '#1C0F13',
    fontSize: 16,
    marginBottom: 10,        
  },
  popUpTextBackground: {
    backgroundColor: '#93C392',
    borderRadius: 20,
    padding: 20,
  },
  popupContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    color: '#1C0F13',
    fontSize: 10,
    textAlign: 'right',
    position: 'absolute',
    right: 5,
    fontWeight: 'bold',
    marginTop: 25,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    left: 5,
  },  
  overlay: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    width: 100,
    height: 100,
    borderRadius: 10,    
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    backgroundColor: '#93C392',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    width: '45%',
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