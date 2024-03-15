import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useEffect } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { validateEmail, validateName } from '../helpers';
import * as SecureStore from 'expo-secure-store';
import NavigationButton from '../components/NavigationButton';
import { useNavigation } from '@react-navigation/native';

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

const WelcomeScreen = () => {

  const navigation = useNavigation();
  
  const { data, loading } = useQuery(USERSQUERY);

  const [createUser, {loading: mutationLoading, error: mutationError}] = useMutation(CREATE_USER_MUTATION);

  useEffect(() => {
    if (data) {
      // Log the list of user names to the console
      const userNames = data.users.map((user: User) => user.name);
      console.log('Loodud kasutajad:', userNames.join(', '));
    }
  }, [data]); // Run this effect whenever the data changes  

  const [name, setName] = React.useState('');
  // const [email, setEmail] = React.useState('');
  const [nameError, setNameError] = React.useState('');
  // const [emailError, setEmailError] = React.useState('');

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
    // let emailError = '';

    nameError = validateName(name, data);
    // emailError = validateEmail(email, data);

    if (nameError) {
      setNameError(nameError);
    // setEmailError(emailError);
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
    }

    navigation.navigate('JourneySelection' as never);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView>
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
          
          <TouchableOpacity style={styles.button} onPress={handleCreateUserPress}>
            <Text style={styles.buttonText}>Hakkan kasvatama!</Text>
          </TouchableOpacity>
        
          {/* <NavigationButton
             buttons={[{ label: 'Alusta nimeta', screenName: 'JourneySelection' }]}
             buttonStyle={{width: '55%'}}
          > */}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>      
  ) 
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#93C392',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    width: '55%',
    alignSelf: 'center',
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
    backgroundColor: 'F5F5F5',
  },
  splashImage: {
    width: 200,
    height: 200,
    marginTop: 30,
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
    marginVertical: 20,
  },
  inputRow: {
    width: '60%',
    height: 'auto',    
  },
  largeText: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#93C385',
    marginHorizontal: 10,
    lineHeight: 35,
  },
});