import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeButton = ({ size = 200 }) => {

    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('UserHomeScreen' as never);
    };

    return (
        <TouchableOpacity onPress={() => handlePress()}>
            <Image
                source={require('../assets/home.png')}
                style={[styles.splashImage, { width: size, height: size }]}
            />
        </TouchableOpacity>
    );

};

export default HomeButton;

const styles = StyleSheet.create({
    splashImage: {
        width: 150,
        height: 150,
        marginBottom: 35,
        marginTop: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
