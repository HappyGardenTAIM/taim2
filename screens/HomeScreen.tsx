import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react'
import Swiper from 'react-native-swiper';
import NotificationTestScreen from './NotificationTestScreen';
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from '@react-navigation/native';
import UserHomeScreen from './UserHomeScreen';
import WelcomeScreen from './WelcomeScreen';

const Slide = ({ content }) => (
  <View style={styles.slideContainer}>
    {content}
  </View>
);

const Splash = () => {

}

const NotificationTest = () => {
  return (
    <View>
      <NotificationTestScreen></NotificationTestScreen>
    </View>
  )
}

const HomeScreen = ({ navigation }) => { 
  // Uncomment to delete stored user name

  // SecureStore.deleteItemAsync('userName')
  // .then(() => console.log('Item deleted'))
  // .catch(error => console.log('Error deleting item', error));

  // Uncomment to delete stored user ID

  // SecureStore.deleteItemAsync('userId')
  // .then(() => console.log('Item deleted'))
  // .catch(error => console.log('Error deleting item', error));
  
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      const checkStoredUserId = async () => {
        try {
          const storedUserId = await SecureStore.getItemAsync('userId');
    
          if (storedUserId) {            
            setActiveSlideIndex(1);
          } else {
            setActiveSlideIndex(0);
          }
        } catch (error) {
          console.error('Error checking stored user ID:', error);
        }
      };
      checkStoredUserId();
    }, [])
  );    
  
  const handleIndexChanged = (index) => {
    setActiveSlideIndex(index);
  };  
   
  return (
    <Swiper 
      showsButtons={true} 
      // loop={false} 
      index={activeSlideIndex}
      onIndexChanged={handleIndexChanged}>
      <Slide content={WelcomeScreen (navigation) } />
      <Slide content={<UserHomeScreen />} />
    </Swiper>   
  );
}

export default HomeScreen

const styles = StyleSheet.create({
  slideContainer: {
    backgroundColor: '#F5F5F5',
    height: '100%'
  },  
});