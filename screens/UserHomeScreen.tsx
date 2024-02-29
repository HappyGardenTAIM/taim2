import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import React from 'react'
import Swiper from 'react-native-swiper';
import NotificationTestScreen from './NotificationTestScreen';
import NavigationButton from '../components/NavigationButton';

const Slide = ({ content}) => (
  <View style={styles.slideContainer}>
    {content}
  </View>
);

const Splash = () => {
  
}

const UserList = (navigation) => {  
  return (
    <SafeAreaView style={styles.flexContainer}>
      <View style={styles.flexContainer}>
        <Image source={require('../assets/taim.png')} style={styles.splashImage}/>
      </View> 
      <View style={styles.flexContainer}>
        <NavigationButton
          buttons={[
            {
              label: 'Minu taimed',
              screenName: 'FLOWERScreen', 
            },
          ]}
        />
      </View>
      <View style={styles.flexContainer}>
        <NavigationButton
          buttons={[
            {
              label: 'Minu teekond',
              screenName: 'FOODScreen', 
            },
          ]}
        />
      </View>
      <View style={styles.flexContainer}>
        <NavigationButton
          buttons={[
            {
              label: 'Minu seaded',
              screenName: 'SPROUTScreen', 
            },
          ]}
        />
      </View>         
    </SafeAreaView>
  ) 
}

const NotificationTest = () => {
  console.log('NotificationTest');
  return (
      <NotificationTestScreen></NotificationTestScreen>
  )
}

const UserHomeScreen = ({ navigation }) => {
    
    return (
      <Swiper showsButtons={true} loop={false}>
        <Slide content={UserList (navigation)}/>
        {/* <Slide content={NotificationTest()}/> */}
      </Swiper>   
    )
}

export default UserHomeScreen

const styles = StyleSheet.create({
  slideContainer: {
    flex: 1,
    backgroundColor: '#f1ffff',
    height: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#93C392',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    width: '45%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#1C0F13',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonLabel: {
    color: '#F5F5F5',
    fontSize: 16,
  },
  flexContainer: { 
    alignItems: 'center',
    width: '100%',
  },
  splashImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
    alignSelf: 'center',
  },
  input: {
    borderColor: '#93C392',
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 4,
    marginHorizontal: 10,
    padding: 10,    
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginHorizontal: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  inputRow: {
    width: '45%',    
  },
  userList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    margin: 10,
    marginLeft: 30,
  }
});