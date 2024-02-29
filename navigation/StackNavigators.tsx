import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import UserHomeScreen from '../screens/UserHomeScreen';
import ChooseWhatToGrowScreen from '../screens/ChooseWhatToGrowScreen'; 
import SPROUTScreen from '../screens/SproutScreen';
import FLOWERScreen from '../screens/FLOWERScreen';
import FOODScreen from '../screens/FOODScreen';
import { NavigationContainer } from '@react-navigation/native';

const Nav = createNativeStackNavigator<RootStackParamList>();

function StackNavigator() {
  return (
    <NavigationContainer>
      <Nav.Navigator>
        <Nav.Screen name="Main" component={HomeScreen} options={{ headerShown: true }} />
        <Nav.Screen name="UserHomeScreen" component={UserHomeScreen} />
        <Nav.Screen name="ChooseWhatToGrow" component={ChooseWhatToGrowScreen} />
        <Nav.Screen name="FLOWERScreen" component={FLOWERScreen} />
        <Nav.Screen name="SPROUTScreen" component={SPROUTScreen} />
        <Nav.Screen name="FOODScreen" component={FOODScreen} />
      </Nav.Navigator> 
    </NavigationContainer>
  );
}

export default StackNavigator