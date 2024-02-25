import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ChooseWhatToGrowScreen from '../screens/ChooseWhatToGrowScreen'; 
import SPROUTScreen from '../screens/SPROUTScreen';
import FLOWERScreen from '../screens/FLOWERScreen';
import FOODScreen from '../screens/FOODScreen';
import SelectSproutScreen from '../screens/SelectSproutScreen';
import SelectFoodScreen from '../screens/SelectFoodScreen';
import SelectFlowerScreen from '../screens/SelectFlowerScreen';
import SproutJourneyScreen from '../screens/SproutJourneyScreen';
import { NavigationContainer } from '@react-navigation/native';

const Nav = createNativeStackNavigator<RootStackParamList>();

function StackNavigator() {
  return (
    <NavigationContainer>
      <Nav.Navigator>
        <Nav.Screen name="Main" component={HomeScreen} options={{ headerShown: true }} />
        <Nav.Screen name="ChooseWhatToGrow" component={ChooseWhatToGrowScreen} />
        <Nav.Screen name="FLOWERScreen" component={FLOWERScreen} />
        <Nav.Screen name="SPROUTScreen" component={SPROUTScreen} />
        <Nav.Screen name="FOODScreen" component={FOODScreen} />
        <Nav.Screen name="SelectSproutScreen" component={SelectSproutScreen} />
        <Nav.Screen name="SelectFoodScreen" component={SelectFoodScreen} />
        <Nav.Screen name="SelectFlowerScreen" component={SelectFlowerScreen} />
        <Nav.Screen name="SproutJourneyScreen" component={SproutJourneyScreen} />
      </Nav.Navigator> 
    </NavigationContainer>
  );
}

export default StackNavigator