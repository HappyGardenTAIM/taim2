import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface AbandonJourneyConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
  visible: boolean;
}

const AbandonJourneyConfirmation: React.FC<AbandonJourneyConfirmationProps> = ({ onConfirm, onCancel, visible }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <TouchableOpacity
        style={styles.popupContainer}
        activeOpacity={1}
        >     
        <View style={styles.popUpTextBackground}>
          <TouchableOpacity style={styles.closeButton} onPress={onCancel}>
            <Icon name="times" size={20} color="black" />
          </TouchableOpacity>
          <Text style={styles.confirmationText}>Kindel, et tahad otsast alustada?</Text>
          <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.buttonLabel}>Jah, jäta pooleli</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.buttonLabel}>Kasvatan edasi</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

export default AbandonJourneyConfirmation;

// delete button styles

const styles = StyleSheet.create({
  popUpTextBackground: {
    backgroundColor: '#93C392',
    borderRadius: 30,
    padding: 20,
    width: '80%',
  },
  confirmationText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  confirmButton: {
    backgroundColor: '#FFBF00',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '85%',
    alignSelf: 'center',
  },
  cancelButton: {
    backgroundColor: '#caffa8',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '85%',
    alignSelf: 'center',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  popupContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,    
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});