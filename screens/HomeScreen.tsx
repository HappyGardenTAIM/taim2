import { Button, SafeAreaView, Text} from 'react-native'
import React from 'react'
import { gql, useQuery } from '@apollo/client'
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

const HomeScreen = () => {
    const { data, loading } = useQuery(USERSQUERY);
    const navigation = useNavigation();

    const handleGetStartedPress = () => {
      // Navigate to the ChooseWhatToGrow screen
      navigation.navigate('ChooseWhatToGrow' as never);
    };

    if (loading) {
        return <Text>Laen andmeid</Text>
      }
    return (
        <SafeAreaView>
            {data.users.map((user: any) => (
                <Text key={user.id}>{user.name}</Text>))}

            <Text>Oled koduaknas</Text>	

            
            <Button title="Get Started" onPress={handleGetStartedPress} />
        </SafeAreaView>
    )
}

export default HomeScreen