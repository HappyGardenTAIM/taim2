import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import React from 'react'
import { gql, useQuery } from '@apollo/client'
import Swiper from 'react-native-swiper';


interface User {
    id: number;
    email: string;
    name: string;
    role: rolesEnum;
  }

const USERSQUERY = gql`
query Users {
  users {
    id
    createdAt
    email
    name
    role
  }
}
`

const Slide = ({ content }) => (
  <View style={styles.slideContainer}>
    {content}
  </View>
);
const Splash = () => {
  
}


const UserList = (navigation) => {
  const handleGetStartedPress = () => {
    navigation.navigate('ChooseWhatToGrow');
  };
  const { data, loading } = useQuery(USERSQUERY);
  if (loading) {
    return <Text>Laen andmeid</Text>
  }
  return (
    <SafeAreaView>
      <View style={styles.flexContainer}>
        <Image source={require('../assets/taim.png')} style={styles.splashImage}/>
      </View> 
      <View style={styles.flexContainer}>
        <TouchableOpacity style={styles.button} onPress={handleGetStartedPress}>
          <Text style={styles.buttonText}>Alusta</Text>
        </TouchableOpacity>
      </View> 
      <View style={styles.flexContainer}>
      <Text>Loodud kasutajad: </Text>
        {data.users.map((user: User) => (
          <Text key={user.id}>{user.name}</Text>))}
      </View>
      
         
    </SafeAreaView>
  ) 
}

const HomeScreen = ({ navigation }) => {
    
    return (
      <Swiper showsButtons={false} loop={false}>
        <Slide content={UserList(navigation)}/>
        <Slide content={undefined} />
        <Slide content={undefined} />
      </Swiper>
        
    )
}

export default HomeScreen

const styles = StyleSheet.create({
  slideContainer: {
    backgroundColor: '#f1ffff',
    height: '100%'
  },
  button: {
    backgroundColor: '#93C392',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    width: '45%',
  },
  buttonText: {
    color: '#1C0F13',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  splashImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  }
});