import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import React, { useEffect } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import Swiper from 'react-native-swiper';
import { validateEmail, validateName } from '../helpers';
import NotificationTestScreen from './NotificationTestScreen';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import NavigationButton from '../components/NavigationButton';

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

const CREATE_USER_MUTATION = gql`
mutation CreateUser($name: String) {
  createUser(data: {name: $name}) {
    id
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

  // Uncomment to delete stored user name

  // SecureStore.deleteItemAsync('userName')
  // .then(() => console.log('Item deleted'))
  // .catch(error => console.log('Error deleting item', error));

  useEffect(() => {
    checkStoredUserName();
  }, []);

  const checkStoredUserName = async () => {
    try {
      const storedUserId = await SecureStore.getItemAsync('userName');

      if (storedUserId) {
        navigation.navigate('ChooseWhatToGrow');
      }
    } catch (error) {
      console.error('Error checking stored user ID:', error);
    }
      
  const handleGetStartedPress = () => {
    navigation.navigate('ChooseWhatToGrow');

  };

  const { data, loading } = useQuery(USERSQUERY);

  const [name, setName] = React.useState('');
  // const [email, setEmail] = React.useState('');
  const [nameError, setNameError] = React.useState('');
  // const [emailError, setEmailError] = React.useState('');

  const [createUser, {loading: mutationLoading, error: mutationError}] = useMutation(CREATE_USER_MUTATION, {
    refetchQueries: [
      USERSQUERY,
      'Users'
    ],
  });


  if (loading) {
    return <Text>Laadin andmeid</Text>
  }  

  if (mutationLoading) {
    return <Text>Loon kasutajat</Text>
  }

  if (mutationError) {
    return <Text>Kasutaja loomine ebaõnnestus</Text>
  }

  const handleCreateUserPress = async () => {  
    let nameError = '';
  //   let emailError = '';

    nameError = validateName(name, data);
  //   emailError = validateEmail(email, data);

    if (nameError) {
      setNameError(nameError);
  //     setEmailError(emailError);
      return;
    }
    
    setNameError('');
    // setEmailError('');
    
    try {
      const { data: mutationData } = await createUser({ 
        variables: {
            name, 
         },
      })

      const userId = mutationData.createUser.id;
      const userName = mutationData.createUser.name;

      await SecureStore.setItemAsync('userId', userId.toString());
      await SecureStore.setItemAsync('userName', userName.toString());

      console.log('Kasutaja loodud', mutationData);

      setName('');
      // setEmail('');

    } catch (error) {
      console.log('Mutation Error:', error);

    if (error.networkError && error.networkError.result) {
      console.log('Network Errors:', error.networkError.result.errors);
    }

    navigation.navigate('ChooseWhatToGrow');
  };

  return (
    <SafeAreaView>
      <View style={styles.flexContainer}>
        <Image source={require('../assets/taim.png')} style={styles.splashImage}/>
      </View> 
      <View style={styles.flexContainer}>
        <Text style={styles.largeText}>Saame tuttavaks!{'\n'}Mina olen TAIM.</Text>
      </View>
      
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <TextInput style={styles.input} placeholder="Mis sinu nimi on?" value={name} onChangeText={(text) => setName(text)} />
          {nameError && <Text style={styles.errorText}>{nameError}</Text>}
        </View>        
      </View>

      <View style={styles.flexContainer}>
      <View style={styles.userList}>
        <Text>Loodud kasutajad:</Text>        
        {data?.users?.map((user: User) => (
          <Text key={user.id}>{user.name} </Text>
        ))}
      </View>
    </View>
    <View style={styles.inputContainer}>
      <View style={styles.inputRow}>
        <TextInput style={styles.input} placeholder="Kasutajanimi" value={name} onChangeText={(text) => setName(text)} />
        {nameError && <Text style={styles.errorText}>{nameError}</Text>}
      </View>

      <View style={styles.flexContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCreateUserPress}>
          <Text style={styles.buttonText}>Hakkan kasvatama!</Text>
        </TouchableOpacity>
      </View>  
      <View style={styles.flexContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ChooseWhatToGrow')}>
          <Text style={styles.buttonText}>Alusta nimeta</Text>
        </TouchableOpacity>
      </View> 
         
    </SafeAreaView>
  ) 
}

const NotificationTest = () => {
  return (
    <View>
      <NotificationTestScreen></NotificationTestScreen>
    </View>
  )
}


const HomeScreen = ({ navigation }) => {    
  return (
    <Swiper showsButtons={true} loop={false}>
      <Slide content={UserList (navigation)}/>
      <Slide content={UserList (navigation)}/>
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
  },
  input: {
    borderColor: '#93C392',
    borderWidth: 3,
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
    width: '60%',
    height: 'auto',    
  },
  userList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    margin: 10,
    marginLeft: 30,
  },
  largeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: '#93C385',
    marginHorizontal: 10,
    lineHeight: 35,
  },
});