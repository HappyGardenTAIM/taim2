import React from 'react';
import { StyleSheet, Pressable, Text, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface ButtonConfig {
  label: string;
  screenName: string;
}

interface NavigationButtonProps {
  buttons: ButtonConfig[];
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ buttons }) => {
  const navigation = useNavigation();

  const handlePress = (screenName: string) => {
    console.log('Navigating to', screenName);
    navigation.navigate({name: screenName} as never);
  };

  return (
    <SafeAreaView>
      {buttons.map(({ label, screenName }, index) => (
        <Pressable
          key={`${screenName}${index}`}
          style={styles.button}
          onPress={() => handlePress(screenName)}>
          <Text style={styles.buttonLabel}>{label}</Text>
        </Pressable>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row', // Arrange buttons horizontally
    flexWrap: 'wrap', // Allow buttons to wrap to the next row if needed
    justifyContent: 'center', // Center buttons horizontally
    alignItems: 'center', // Center buttons vertically
    width: '100%', // Occupy full width of the container
  },
  button: {
    backgroundColor: '#93C392',
    padding: 15,
    borderRadius: 10,
    margin: 10, // Add some margin between buttons
    minWidth: 120, // Set minimum width for buttons
    alignItems: 'center',
    justifyContent: 'center',
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
