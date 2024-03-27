import React from 'react';
import { Text, View, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const InfoPopup = ({ content, visible, onClose }) => {
  if (!visible) return null;

  return (      
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.popupContainer}
        activeOpacity={1}
        onPress={onClose}
      >       
        <View style={styles.popUpTextBackground}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="times" size={20} color="black" />
          </TouchableOpacity>             
          <Text style={styles.popupText}>{content}</Text>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
    popupContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,    
      },
    popUpTextBackground: {
        backgroundColor: '#93C392',
        borderRadius: 30,
        padding: 20,
        width: '80%',
    },
    popupText: {
        color: '#1C0F13',
        fontSize: 16,
        marginBottom: 10,        
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});

export default InfoPopup;