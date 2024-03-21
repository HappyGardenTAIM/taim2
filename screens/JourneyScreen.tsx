import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { gql, useQuery, useMutation } from '@apollo/client';
import * as SecureStore from 'expo-secure-store';

const GET_USER_JOURNEYS = gql`
query GetUserJourneys($userId: Int!) {
    user(id: $userId) {
      journeys {
        plant {
          taskDetails {
            order
            taskDetail {
              description
              difficulty
              id
              phase
              picture
            }
          }
        }
      }
    }
  }
`;

const JourneyScreen = () => {

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getUserId = async () => {
      const id = await SecureStore.getItemAsync('userId');
      console.log('userId:', id);
      setUserId(parseInt(id));
    };
    getUserId();
  }, []);

  const { loading, error, data } = useQuery(GET_USER_JOURNEYS, {
      variables: { userId },
    });

  if (loading) {
    return <Text>Laadin...</Text>;
  }
  
  if (error) {
    return <Text>Tekkis viga: {error.message}</Text>;
  }

  if(data) {console.log(data)}

  return (
    
      <View style={styles.container}>
          <Image source={require('../assets/taim.png')} style={styles.image} />
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 16,
    },
});

export default JourneyScreen;