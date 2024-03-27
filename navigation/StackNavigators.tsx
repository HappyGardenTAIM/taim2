import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import UserHomeScreen from '../screens/UserHomeScreen';
import JourneySelectionScreen from '../screens/JourneySelectionScreen'; 
import JourneyScreen from '../screens/JourneyScreen';
import { NavigationContainer } from '@react-navigation/native';
import { getTitleForJourneyInfoScreen } from '../helpers';
import JourneyInfoScreen from '../screens/JourneyInfoScreen';
import PlantSelectionScreen from '../screens/PlantSelectionScreen';
import JourneyPrepScreen from '../screens/JourneyPrepScreen';

const Nav = createNativeStackNavigator<RootStackParamList>();

function StackNavigator({initialRouteName}) {
  return (
    <NavigationContainer>
      <Nav.Navigator initialRouteName={initialRouteName}>
        <Nav.Screen name="WelcomeScreen" component={WelcomeScreen} options={{title: 'Tere tulemast!'}}/>
        <Nav.Screen name="UserHomeScreen" component={UserHomeScreen} options={{title: 'Kodu'}}/>  
        <Nav.Screen name="PlantSelectionScreen" component={PlantSelectionScreen} options={{title: 'Vali taim'}}/>
        <Nav.Screen name="JourneyScreen" component={JourneyScreen} options={{title: 'Õpitee'}}/>
        <Nav.Screen name="JourneySelection" component={JourneySelectionScreen} options={{title: 'Õpitee valik'}}/>
        <Nav.Screen name="JourneyInfoScreen" component={JourneyInfoScreen} options={({ route }) => ({title: getTitleForJourneyInfoScreen(route.params.journeyType)})}/>
        <Nav.Screen name="JourneyPrepScreen" component={JourneyPrepScreen} options={{title: 'Ettevalmistus'}}/>
      </Nav.Navigator> 
    </NavigationContainer>
  );
}

export default StackNavigator