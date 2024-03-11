import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import UserHomeScreen from '../screens/UserHomeScreen';
import ChooseWhatToGrowScreen from '../screens/ChooseWhatToGrowScreen'; 
import SPROUTScreen from '../screens/SproutScreen';
import FLOWERScreen from '../screens/FLOWERScreen';
import FOODScreen from '../screens/FOODScreen';
import SelectSproutScreen from '../screens/SelectSproutScreen';
import SelectFoodScreen from '../screens/SelectFoodScreen';
import SelectFlowerScreen from '../screens/SelectFlowerScreen';
import JourneyScreen from '../screens/JourneyScreen';
import { NavigationContainer } from '@react-navigation/native';

const Nav = createNativeStackNavigator<RootStackParamList>();

function StackNavigator({initialRouteName}) {
  return (
    <NavigationContainer>
      <Nav.Navigator initialRouteName={initialRouteName}>
        <Nav.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Nav.Screen name="UserHomeScreen" component={UserHomeScreen} />
        <Nav.Screen name="ChooseWhatToGrow" component={ChooseWhatToGrowScreen} />
        <Nav.Screen name="FLOWERScreen" component={FLOWERScreen} />
        <Nav.Screen name="SPROUTScreen" component={SPROUTScreen} />
        <Nav.Screen name="FOODScreen" component={FOODScreen} />
        <Nav.Screen name="SelectSproutScreen" component={SelectSproutScreen} />
        <Nav.Screen name="SelectFoodScreen" component={SelectFoodScreen} />
        <Nav.Screen name="SelectFlowerScreen" component={SelectFlowerScreen} />
        <Nav.Screen name="JourneyScreen" component={JourneyScreen} />
      </Nav.Navigator> 
    </NavigationContainer>
  );
}

export default StackNavigator