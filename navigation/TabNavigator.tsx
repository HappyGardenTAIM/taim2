import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTab from './StackNavigators';

const Nav = createBottomTabNavigator();
const BottomNavigator = () => {
    return(
        <NavigationContainer>
            <Nav.Navigator
            screenOptions={{ headerShown: true }}
            >
                <Nav.Screen name="HomeTab" component={HomeTab} /> 
            </Nav.Navigator>
        </NavigationContainer>
    )
}
export default BottomNavigator;