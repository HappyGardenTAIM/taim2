import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import * as SecureStore from 'expo-secure-store';
import Journey from '../components/Journey';
import HomeButton from '../components/HomeButton';

// const GET_USER_JOURNEY = gql`
//   query GetUserJourney($journeyId: Int!) {
//     journey(id: $journeyId) {
//       plant {
//         taskDetails {
//           order
//           taskDetail {
//             description
//             difficulty
//             id
//             phase
//             picture
//           }
//         }
//       }
//     }
//   }
// `;

const JourneyScreen = ( { route }) => {

  // const [userId, setUserId] = useState(null);
  // const { journeyId } = route.params;
  // console.log('route.params:', route.params);

  // useEffect(() => {
  //   const getUserId = async () => {
  //     const id = await SecureStore.getItemAsync('userId');
  //     console.log('userId:', id);
  //     setUserId(parseInt(id));
  //   };
  //   getUserId();
  // }, []);

  // const { loading, error, data } = useQuery(GET_USER_JOURNEY, {
  //     variables: { userId, journeyId }, 
  //   });

  // if (loading) {
  //   return <Text>Laadin...</Text>;
  // }
  
  // if (error) {
  //   return <Text>Tekkis viga: {error.message}</Text>;
  // }

  // if(data) {console.log(data)}

  return (
      <View style={styles.container}>
          <HomeButton />
          <Journey />
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