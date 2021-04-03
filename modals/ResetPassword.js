import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, Button } from 'react-native';

import RoundButton from '../components/button/RoundButton'

export default function ResetPassword( props ) {

    return (
        <ImageBackground source={require('../assets/bluePurpleBG.jpg')} style={ styles.modalBackground }>
            <Text style={ styles.title }>Reset Password</Text>
            <View style={ {top: 25} }>
                <TextInput
                    style={styles.textInput}
                    placeholder='Email'
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Password'
                />
            </View>
            <RoundButton title='Submit' />
            <Button onPress={() => props.updateModal(false)} title="Close" />
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    modalBackground:
    {
        backgroundColor: 'blue',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    textInput: {
        borderRadius: 50,
        width: 275,
        height: 40,
        backgroundColor: '#fff', // White
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: 'black',
        textAlign: 'center'
    },
    title: {
        color: 'white',
        fontSize: 45,
        fontWeight: 'bold',
        top: 50
    }
})