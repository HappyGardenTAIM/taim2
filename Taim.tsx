import React, { useEffect, useState } from 'react';
import StackNavigator from './navigation/StackNavigators';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Taim = () => {
    // Uncomment to delete stored user name

    // SecureStore.deleteItemAsync('userName')
    // .then(() => console.log('Item deleted'))
    // .catch(error => console.log('Error deleting item', error));

    // Uncomment to delete stored user ID

    // SecureStore.deleteItemAsync('userId')
    // .then(() => console.log('Item deleted'))
    // .catch(error => console.log('Error deleting item', error));

    // Uncomment to delete stored journey type

    // AsyncStorage.removeItem('selectedJourney')

    const [initialScreen, setInitialScreen] = useState(null); // Initialize with null
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const checkStore = async () => {
            try {
                const storedUserId = await SecureStore.getItemAsync('userId');
                const storedUserName = await SecureStore.getItemAsync('userName');
                const storedJourneyType = await AsyncStorage.getItem('selectedJourney');

                console.log('Stored user ID:', storedUserId, 'Stored user name:', storedUserName, 'Stored journey type:', storedJourneyType);
        
                if (storedUserId) {                  
                    if (storedJourneyType) {
                        console.log('Setting initial screen to UserHomeScreen');
                        setInitialScreen('UserHomeScreen');
                    } else {
                        console.log('Setting initial screen to JourneySelectionScreen');
                        setInitialScreen('JourneySelection');
                    }
                } else {
                    console.log('Setting initial screen to WelcomeScreen');
                    setInitialScreen('WelcomeScreen');
                }
            } catch (error) {
                console.log('Error checking stored user ID:', error);
            } finally {
                setLoading(false); // Set loading to false when done
            }
        }
        checkStore();
    }, []);

    if (loading) {
        return null; // Return null while loading
    }

    return (      
        <StackNavigator initialRouteName={initialScreen}/>
    );
};

export default Taim