import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

// import { useFonts, Roboto_Italic } from '@expo-google-fonts/roboto'
// import * as Font from 'expo-font';

export default function RoundButton( {title} ) {

    return (

        <TouchableOpacity>
            <View style={ styles.button }>
                <Text style={ styles.buttonText }>{ title }</Text>
                <Text style={ {fontFamily: 'Roboto_Italic'} }>Some Text</Text>
                <Text>Some Text</Text>
            </View>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
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
