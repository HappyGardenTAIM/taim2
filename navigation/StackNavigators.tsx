import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ChooseWhatToGrowScreen from '../screens/ChooseWhatToGrowScreen'; 
import SproutScreen from '../screens/SproutScreen';
import SomethingPrettyScreen from '../screens/SomethingPrettyScreen';
import SomethingTastyScreen from '../screens/SomethingTastyScreen';
import { NavigationContainer } from '@react-navigation/native';

const Nav = createNativeStackNavigator<RootStackParamList>();

function StackNavigator() {
  return (
    <NavigationContainer>
      <Nav.Navigator>
        <Nav.Screen name="Main" component={HomeScreen} options={{ headerShown: true }} />
        <Nav.Screen name="ChooseWhatToGrow" component={ChooseWhatToGrowScreen} />
        <Nav.Screen name="SomethingTastyScreen" component={SomethingTastyScreen} />
        <Nav.Screen name="SomethingPrettyScreen" component={SomethingPrettyScreen} />
        <Nav.Screen name="SproutScreen" component={SproutScreen} />
      </Nav.Navigator> 
    </NavigationContainer>
  );
}

export default StackNavigator