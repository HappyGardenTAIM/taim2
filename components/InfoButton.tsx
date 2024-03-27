import React, { useState } from 'react';
import { StyleSheet, Pressable, View, Image, ViewStyle } from 'react-native';
import popupTexts from '../popupTexts';
import InfoPopup from './InfoPopup';

interface InfoButtonProps {
  identifier: string;
  buttonStyle?: ViewStyle;
  containerStyle?: ViewStyle;
}

const InfoButton: React.FC<InfoButtonProps> = ({ identifier, buttonStyle, containerStyle }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState(null);

  const onInfoPress =() => {
    setShowPopup(true);
    setPopupContent(popupTexts[identifier]?.info || 'Info puudub');
  };

  const onClose = () => {
    setShowPopup(false);
  };

  return (
    <>
      <Pressable onPress={onInfoPress} style={styles.infoButton}>
        <Image source={require('../assets/question.png')}/> 
      </Pressable>
      <InfoPopup 
        visible={showPopup} 
        content={popupContent} 
        onClose={onClose} 
      />
    </>
  );
};

const styles = StyleSheet.create({
  infoButton: {
    backgroundColor: '#93C392',
    padding: 5,
    borderRadius: 20,
    marginLeft: 10,
  },
});

export default InfoButton;