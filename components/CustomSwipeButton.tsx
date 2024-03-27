import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SwipeButton from 'rn-swipe-button';
import InfoButton from './InfoButton';

interface SwipeButtonConfig {
    title: string;
    thumbIconImageSource?: string;
    identifier: string;
}

interface SwipeButtonProps {
  buttons: SwipeButtonConfig[];
}

const CustomSwipeButton: React.FC<SwipeButtonProps> = ({ buttons }) => {

  return (
    <>
      {buttons.map((button, index) => (
        <View key={`${button.title}${index}`} style={styles.buttonContainer}>
          <SwipeButton
            title={button.title}
            thumbIconImageSource={button.thumbIconImageSource}
            swipeSuccessThreshold={70}
            height={45}
            width={300}
            titleStyles={ styles.buttonText }
            railFillBackgroundColor="#93c392aa"
            railFillBorderColor="#93c392"
            thumbIconBackgroundColor="#93C392"
            thumbIconBorderColor="#577a4c"
            railBackgroundColor="#d2ebd1"
            railBorderColor="#d2ebd1"
          />
          <InfoButton identifier={button.identifier} />
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  buttonText: {
      color: '#1C0F13',
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default CustomSwipeButton;