import React from 'react';
import { StyleSheet, Pressable, Text, ViewStyle, TextStyle, View } from 'react-native';
import SwipeButton from 'rn-swipe-button';

interface SwipeButtonConfig {
    title: string;
    thumbIconImageSource?: string;
    swipeSuccessThreshold?: number;
    height?: number;
    width?: number;
    titleStyles?: TextStyle;        
    onSwipeSuccess?: () => void;
    railFillBackgroundColor?: string;
    railFillBorderColor?: string;
    thumbIconBackgroundColor?: string;
    thumbIconBorderColor?: string;
    railBackgroundColor?: string;
    railBorderColor?: string;
    enableReverseSwipe?: boolean;
}

interface SwipeButtonProps {
  buttons: SwipeButtonConfig[];
  buttonStyle?: ViewStyle;
  titleStyle?: TextStyle;
  containerStyle?: ViewStyle;
}

// const SwipeButton: React.FC<SwipeButtonProps> = ({ buttons, buttonStyle, titleStyle, containerStyle }) => {

//     //const [buttonTitle, setButtonTitle] = useState({title});

//     // const handleSwipeSuccess = () => {
//     //   setButtonTitle('Confirmed!');
//     //   // You can perform additional actions here if needed
//     // };


//   const handlePress = (screenName: string, params?: object) => {
//   };

//   //return (
//     // <SafeAreaView style={[styles.buttonContainer, containerStyle]}>
//     //   {buttons.map(({ label, screenName, params }, index) => (
//     //     <Pressable
//     //       key={`${screenName}${index}`}
//     //       style={[styles.button, buttonStyle]}
//     //       onPress={() => handlePress(screenName, params)}>
//     //       <Text style={[styles.buttonLabel, labelStyle]}>{label}</Text>
//     //     </Pressable>
//     //   ))}
//     // </SafeAreaView>
//   //);
// };

const styles = StyleSheet.create({
  buttonContainer: {    
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    backgroundColor: '#93C392',
    padding: 15,
    borderRadius: 10,
    margin: 10, // Add some margin between buttons
    minWidth: 120, // Set minimum width for buttons
    alignSelf: 'center',
  },
  buttonLabel: {
    color: '#1C0F13',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', // Center the text horizontally
    maxWidth: '100%', // Ensure text doesn't overflow button width
  },
});

export default SwipeButton;
