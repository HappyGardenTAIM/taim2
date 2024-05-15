import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const JourneyStart = ({ onClose, visible, plant }) => {
    
  return (
		
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >	
			<View style={styles.overlay}>
				<View style={styles.popupContainer}>
					<TouchableOpacity style={styles.closeButton} onPress={onClose}>
						<Icon name="times" size={20} color="black" />
					</TouchableOpacity> 
					<Text style={styles.largeText}>Sinu uus taim</Text>
					<Image
						defaultSource={require('../assets/taim.png')}
						source={{ uri: plant.image }}
						style={styles.plantImage}
						alt={plant.name}
					/>  
					<Text style={styles.largeText}>{plant.name}</Text>
					<TouchableOpacity style={styles.button} onPress={onClose}>
						<Text style={styles.buttonText}>Vaata, kuidas kasvatada</Text>
					</TouchableOpacity>
				</View>
			</View>
    </Modal>
		     
  );
};

const styles = StyleSheet.create({
	popupContainer: {
		backgroundColor: '#93C392',
		justifyContent: 'center',
		alignItems: 'center',
 		borderRadius: 30,
		width: '80%',
		padding: 20,
	},
	overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,		
  },
	closeButton: {
		position: 'absolute',
		top: 10,
		right: 10,
	},
	largeText: {
		fontSize: 34,
		fontWeight: 'bold',
		textAlign: 'center',
		marginVertical: 40,
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
	button: {
    backgroundColor: '#caffa8',
    padding: 15,
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    width: '80%',
  },
	buttonText: {
    color: '#1C0F13',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
    
export default JourneyStart;