import { SafeAreaView, Text} from 'react-native'
import React from 'react'
import { gql, useQuery } from '@apollo/client'

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
    const { data, loading } = useQuery(USERSQUERY)
    if (loading) {
        return <Text>Laen andmeid</Text>
      }
    return (
        <SafeAreaView>
            {data.users.map((user: any) => (
                <Text key={user.id}>{user.name}</Text>))}

            <Text>Oled koduaknas</Text>	
        </SafeAreaView>
    )
}

export default HomeScreen