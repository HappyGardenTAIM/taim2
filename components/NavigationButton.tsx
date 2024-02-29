import React from 'react';
import { StyleSheet, Pressable, Text, SafeAreaView, ViewStyle, TextStyle, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface ButtonConfig {
  label: string;
  screenName: string;
}

interface NavigationButtonProps {
  buttons: ButtonConfig[];
  buttonStyle?: ViewStyle;
  labelStyle?: TextStyle;
  containerStyle?: ViewStyle;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ buttons, buttonStyle, labelStyle, containerStyle }) => {
  const navigation = useNavigation();

  const handlePress = (screenName: string) => {
    console.log('Navigating to', screenName);
    navigation.navigate({name: screenName} as never);
  };

  return (
    <SafeAreaView style={[styles.buttonContainer, containerStyle]}>
      {buttons.map(({ label, screenName }, index) => (
        <Pressable
          key={`${screenName}${index}`}
          style={[styles.button, buttonStyle]}
          onPress={() => handlePress(screenName)}>
          <Text style={[styles.buttonLabel, labelStyle]}>{label}</Text>
        </Pressable>
      ))}
    </SafeAreaView>
  );
};

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

export default NavigationButton;
