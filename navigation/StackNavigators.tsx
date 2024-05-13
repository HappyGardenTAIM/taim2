import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import UserHomeScreen from '../screens/UserHomeScreen';
import JourneySelectionScreen from '../screens/JourneySelectionScreen'; 
import JourneyScreen from '../screens/JourneyScreen';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import PlantSelectionScreen from '../screens/PlantSelectionScreen';
import Loader from '../components/Loader';
import CompletedJourneysScreen from '../screens/CompletedJourneysScreen';

const Nav = createNativeStackNavigator<RootStackParamList>();

function StackNavigator({initialRouteName}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading process (replace with actual asynchronous operation)
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after a delay
    }, 3000); // Example: Simulating a 2-second loading time
    
    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  useEffect(() => {
    // Simulate screen content loading process (replace with actual check)
    const screenContentTimer = setTimeout(() => {
      setLoading(false); // Set loading to false when screen content is fully loaded
    }, 3000); // Example: Simulating a 1-second loading time for screen content

    // Cleanup on unmount or when screen content is fully loaded
    return () => clearTimeout(screenContentTimer);
  }, []);

  return (
    <NavigationContainer>
      <Nav.Navigator initialRouteName={initialRouteName}>
        <Nav.Screen name="WelcomeScreen" component={WelcomeScreen} options={{title: 'Tere tulemast!'}}/>
        <Nav.Screen name="UserHomeScreen" component={UserHomeScreen} options={{title: 'Kodu'}}/>  
        <Nav.Screen name="PlantSelectionScreen" component={PlantSelectionScreen} options={{title: 'Vali taim'}}/>
        <Nav.Screen name="JourneyScreen" component={JourneyScreen} options={{title: 'Õpitee'}}/>
        <Nav.Screen name="JourneySelection" component={JourneySelectionScreen} options={{title: 'Õpitee valik'}}/>
        <Nav.Screen name="CompletedJourneysScreen" component={CompletedJourneysScreen} options={{title: 'Lõpetatud õpiteed'}}/>
      </Nav.Navigator> 
      {loading && <Loader />}
    </NavigationContainer>
  );
}

export default StackNavigator;