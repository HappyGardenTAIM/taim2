import React from 'react';
import { SafeAreaView, View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { gql, useMutation, useQuery } from '@apollo/client';

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

  // Mock user data
  const userData = {
    name: 'Olen Taim',
    image: require('../assets/taim.png'),
  };

  const navigateToJourney = (journeyType) => {
    navigation.navigate(`${journeyType}Screen` as never); 
  };

  const { loading, error, data } = useQuery(GET_JOURNEY_TYPES);

  if (loading) return <Text>Laen andmeid...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const journeyTypes = data?.journeyTypes;

  const displayTextForSPROUT = journeyTypeDisplayText.SPROUT;
  const displayTextForFOOD = journeyTypeDisplayText.FOOD;
  const displayTextForFLOWER = journeyTypeDisplayText.FLOWER;

  return (
    <SafeAreaView style={styles.container}>
      {/* User's image and data */}
      <View style={styles.userDataContainer}>
        <Image source={userData.image} style={styles.userImage} />
        <Text style={styles.userName}>{userData.name}</Text>
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
    color: '#1C0F13',
    fontSize: 18,
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