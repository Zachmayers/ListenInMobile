import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, Button, TouchableOpacity } from 'react-native';

import RoundButton from '../components/button/RoundButton'

export default function SignIn( props ) {

    return (
        <ImageBackground source={require('../assets/bluePurpleBG.jpg')} style={ styles.modalBackground }>
            <Text style={ styles.title }>Sign In</Text>
            <View style={ {top: 25} }>
                <TextInput
                    style={styles.textInput}
                    placeholder='First Name'
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Last Name'
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Email'
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Username'
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Password'
                />
            </View>
            
            {/* Call API to sign up onPress() and collect data from text fields */}
            <TouchableOpacity>
                <View style={ styles.button }>
                    <Text style={ styles.buttonText }>SUBMIT</Text>
                </View>
            </TouchableOpacity>

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
    },
    button: {
        borderRadius: 50,
        width: 275,
        height: 40,
        // backgroundColor: '#a463bf', PURPLE
        backgroundColor: '#f257c9', // PINK
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: 'black'
    },
    buttonText: {
        fontFamily: 'Roboto_300Light',
        color: 'white',
        textTransform: 'uppercase',
        fontSize: 25,
        textAlign: 'center'
    }
})