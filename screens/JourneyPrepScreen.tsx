import React, { useEffect, useState } from 'react';
import {SafeAreaView, View, Image, StyleSheet, Text, Button } from 'react-native';
import { gql, useQuery, useMutation } from '@apollo/client';
import * as SecureStore from 'expo-secure-store';
import SwipeButton from 'rn-swipe-button';
import SeedInfoButton from '../components/SeedInfoButton';

const GET_USER_JOURNEY = gql`
  query GetUserJourney($journeyId: Int!) {
    journey(id: $journeyId) {
      plant {
        taskDetails {
          order
        }
      }
    }
  }
`;

const JourneyPrepScreen = () => {

  const [userId, setUserId] = useState(null);
  //   const { journeyId } = route.params;
  //console.log('route.params:', route.params);

  useEffect(() => {
    const getUserId = async () => {
      const id = await SecureStore.getItemAsync('userId');
      console.log('userId:', id);
      setUserId(parseInt(id));
    };
    getUserId();
  }, []);

  //   const { loading, error, data } = useQuery(GET_USER_JOURNEY, {
  //       variables: { userId, journeyId }, 
  //     });

  //   if (loading) {
  //     return <Text>Laadin...</Text>;
  //   }
    
  //   if (error) {
  //     return <Text>Tekkis viga: {error.message}</Text>;
  //   }

  //   if(data) {console.log(data)}

  return (
    
      <View style={styles.container}>
          <Image source={require('../assets/taim.png')} style={styles.image} />
          <Text style={styles.largeText}>Sul on vaja:</Text>
          <SwipeButton
          swipeSuccessThreshold={70}
          height={45}
          width={330}
          title="Seemneid"
          titleStyles={ styles.buttonText }
          thumbIconImageSource={require ('../assets/seeds.png') }
          thumbIconComponent={SeedInfoButton}
          onSwipeSuccess={() => {
            alert('Olemas!');
          }}
          railFillBackgroundColor="#93c392"
          railFillBorderColor="#93c392"
          thumbIconBackgroundColor="#93C392"
          thumbIconBorderColor="#577a4c"
          railBackgroundColor="#d2ebd1"
          railBorderColor="#d2ebd1"
        />
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
    largeText: {
        fontSize: 34,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 40,
        color: '#93C385',
        marginHorizontal: 10,
        lineHeight: 35,
    },
    buttonText: {
      color: '#1C0F13',
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
    },
});

export default JourneyPrepScreen;