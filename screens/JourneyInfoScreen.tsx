import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import SPROUTContent from '../components/SPROUTContent';
import FOODContent from '../components/FOODContent';
import FLOWERContent from '../components/FLOWERContent';
import NavigationButton from '../components/NavigationButton';
import HomeButton from '../components/HomeButton';
import { getButtonLabelForJourneyInfoScreen } from '../helpers';

const JourneyInfoScreen = ({ route }) => {

    const { journeyType } = route.params;
    const label = getButtonLabelForJourneyInfoScreen(journeyType);

    const buttonConfigurations = [
        { label: 'Valin midagi muud', screenName: 'JourneySelection' },
        { label: label, screenName: 'PlantSelectionScreen', params: { journeyType: journeyType }  },
    ];    

    let content;

  switch (journeyType) {
    case 'SPROUT':
      content = <SPROUTContent />;
      break;
    case 'FOOD':
      content = <FOODContent />;
      break;
    case 'FLOWER':
      content = <FLOWERContent />;
      break;
    default:
      content = <Text>Vali midagi muud</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <HomeButton />
      {content}
      <View>
        <NavigationButton 
        buttons={buttonConfigurations}
        buttonStyle={styles.button} 
        containerStyle={{flexDirection: 'row'}}
        />
      </View>
    </SafeAreaView>
  );
};

export default JourneyInfoScreen;

const styles = StyleSheet.create({
    container: { 
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        },
    button: {
        backgroundColor: '#93C392',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 10,
        width: '45%',
    },
});