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
        <Nav.Screen name="WelcomeScreen" component={WelcomeScreen} options={{title: 'Tere tulemast!'}}/>
        <Nav.Screen name="UserHomeScreen" component={UserHomeScreen} options={{title: 'Kodu'}}/>
        <Nav.Screen name="ChooseWhatToGrow" component={ChooseWhatToGrowScreen} options={{title: 'Õpitee valik'}}/>
        <Nav.Screen name="FLOWERScreen" component={FLOWERScreen} options={{title: 'Kasvata lill'}}/>
        <Nav.Screen name="SPROUTScreen" component={SPROUTScreen} options={{title: 'Idanda'}}/>
        <Nav.Screen name="FOODScreen" component={FOODScreen} options={{title: 'Kasvata toitu'}}/>
        <Nav.Screen name="SelectSproutScreen" component={SelectSproutScreen} options={{title: 'Vali taim'}}/>
        <Nav.Screen name="SelectFoodScreen" component={SelectFoodScreen} options={{title: 'Vali taim'}}/>
        <Nav.Screen name="SelectFlowerScreen" component={SelectFlowerScreen} options={{title: 'Vali taim'}}/>
        <Nav.Screen name="JourneyScreen" component={JourneyScreen} options={{title: 'Õpitee'}}/>
      </Nav.Navigator> 
    </NavigationContainer>
  );
}

export default StackNavigator