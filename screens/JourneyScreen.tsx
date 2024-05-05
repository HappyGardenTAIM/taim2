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

  return (
      <View style={styles.container}>
          <HomeButton size={170} />
          <Journey route={route}  />
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