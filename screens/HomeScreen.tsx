import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import React from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import Swiper from 'react-native-swiper';
import { validateEmail, validateName } from '../helpers';
import NotificationTestScreen from './NotificationTestScreen';
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
mutation CreateUser($name: String, $email: String!) {
  createUser(data: {name: $name, email: $email}) {
    id
    name
    email
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

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [nameError, setNameError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');

  const [createUser, {loading: mutationLoading, error: mutationError}] = useMutation(CREATE_USER_MUTATION, {
    refetchQueries: [
      USERSQUERY,
      'Users'
    ],
  });


  if (loading) {
    return <Text>Laen andmeid</Text>
  }  

  if (mutationLoading) {
    return <Text>Loon kasutajat</Text>
  }

  if (mutationError) {
    return <Text>Kasutaja loomine ebaõnnestus</Text>
  }

  const handleCreateUserPress = async () => {  
    let nameError = '';
    let emailError = '';

    nameError = validateName(name, data);
    emailError = validateEmail(email, data);

    if (nameError || emailError) {
      setNameError(nameError);
      setEmailError(emailError);
      return;
    }
    
    setNameError('');
    setEmailError('');
    
    try {
      const { data: mutationData } = await createUser({ 
        variables: {
            name,
            email 
        },
      })

      console.log('Kasutaja loodud', mutationData);

      setName('');
      setEmail('');

    } catch (error) {
      console.log('Mutation Error:', error);

    if (error.networkError && error.networkError.result) {
      console.log('Network Errors:', error.networkError.result.errors);
    }
  }
};  

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
      <View style={styles.inputRow}>        
        <TextInput style={styles.input} keyboardType='email-address' placeholder="E-mail" value={email} onChangeText={(text) => setEmail(text)} />
        {emailError && <Text style={styles.errorText}>{emailError}</Text>}
      </View>
    </View>
    <View style={styles.flexContainer}>
      <TouchableOpacity style={styles.button} onPress={handleCreateUserPress}>
        <Text style={styles.buttonText}>Loo kasutaja</Text>
      </TouchableOpacity>
    </View>  

    {/* Navigation to UserHomeScreen */}

    {/* <View style={styles.flexContainer}>
      <NavigationButton
        buttons={[
          {
            label: 'Minu andmed',
            screenName: 'UserHomeScreen', 
          },
        ]}
      />
    </View> */}
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