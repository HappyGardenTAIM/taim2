import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import NavigationButton from './NavigationButton';

const JourneyComplete = ({ onClose, visible }) => {
    
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
                >     
        
                <View style={styles.popUpTextBackground}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Icon name="times" size={20} color="black" />
                    </TouchableOpacity> 
                    <Text style={styles.largeText}>Tubli töö!</Text>
                    <Image
                    source={require('../assets/success.png')}
                    />
                    <NavigationButton
                        buttons={[
                            {
                                label: 'Tagasi koju', 
                                screenName: 'UserHomeScreen',
                            }
                        ]}
                        buttonStyle={{backgroundColor: '#caffa8', marginVertical: 20}}
                    />
                </View>
            </TouchableOpacity>
        </Modal>
        );
    };

    const styles = StyleSheet.create({
        popupContainer: {
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
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
        largeText: {
            fontSize: 34,
            fontWeight: 'bold',
            textAlign: 'center',
            marginVertical: 40,
            marginHorizontal: 10,
            lineHeight: 35,
          },
    });
    
export default JourneyComplete;