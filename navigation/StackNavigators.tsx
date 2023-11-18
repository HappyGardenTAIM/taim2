import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';

const Nav = createNativeStackNavigator<RootStackParamList>();

function HomeTab() {
  return (
    <Nav.Navigator>
      <Nav.Screen name={'Main'} component={HomeScreen} options={{headerShown:false}} />
    </Nav.Navigator>
  );
}

export default HomeTab