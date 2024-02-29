import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, View, ImageBackground, Modal, ScrollView } from 'react-native';
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
      food {
        usage
        benefits
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

const SelectFoodScreen = ({ navigation }) => {

  const [selectedPlant, setSelectedPlant] = useState(null);

  const { loading, error, data } = useQuery(GET_PLANT_INFO, {
    variables: { type: 'FOOD' },
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
            <Text style={styles.popupText}>Valmis {selectedPlant.minGrowthTime}-{selectedPlant.maxGrowthTime} päevaga.</Text>
            {selectedPlant.food.benefits && (
              <Text style={styles.popupText}>{selectedPlant.food.benefits}</Text>
            )}
            {selectedPlant.food.usage && (
              <Text style={styles.popupText}>{selectedPlant.food.usage}</Text>
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

      <Text style={styles.largeText}>Vali oma taim</Text>
      
      <ScrollView contentContainerStyle={styles.scrollView}>
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
                    <View style={styles.infoContainer}>
                      {renderDifficultyIcons(plant.difficulty)}
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.imageText}>{plant.minGrowthTime}-{plant.maxGrowthTime} päeva</Text>   
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
            label: 'Valin midagi muud',
            screenName: 'ChooseWhatToGrow'
          },
        ]}
        buttonStyle={{width: '75%'}}
      />
      </View>
    </SafeAreaView>
  );
};

export default SelectFoodScreen;

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
    marginVertical: 40,
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
    backgroundColor: '#93C392',
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
    backgroundColor: '#93C392',
    padding: 15,
    borderRadius: 20,
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