import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import AbandonJourneyConfirmation from './AbandonJourneyConfirm';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const ABANDON_JOURNEY = gql`
  mutation AbandonJourney($journeyId: Int!, $status: JourneyStatus!) {
    updateJourneyStatus(data: {journeyId: $journeyId, status: $status}) {
      id
    }
 }
`;

interface AbandonJourneyProps {
  journeyId: number;
}

const AbandonJourney: React.FC<AbandonJourneyProps> = ({ journeyId }) => {
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const [abandonJourney] = useMutation(ABANDON_JOURNEY);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  
  const handleConfirmDelete = () => {
    // Perform the deletion
    abandonJourney({
      variables: { journeyId, status: 'ABANDONED' },
    });
    // Reset confirmation state
    toggleModal();
    // Navigate back to the home screen
    navigation.navigate('UserHomeScreen');
  }
  
  const toggleModal = () => {
    // Reset confirmation state
    setConfirmDelete(!confirmDelete);
  }

  return (
    <View>
      <TouchableOpacity style={styles.deleteButton} onPress={toggleModal}>
        <Text style={styles.buttonLabel}>Ei taha enam kasvatada</Text>
      </TouchableOpacity>

      {confirmDelete && (
        <AbandonJourneyConfirmation
          onConfirm={handleConfirmDelete}
          onCancel={toggleModal}
          visible={confirmDelete}
        />
      )}
    </View>
  );
}

export default AbandonJourney;

// delete button styles

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: '#FFBF00',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '85%',
    alignItems: 'center',
    alignSelf: 'center',    
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', // Center the text horizontally
    maxWidth: '100%', // Ensure text doesn't overflow button width
  },
  confirmationContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '85%',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 5,
  },
  confirmationText: {
    fontSize: 16,
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
});