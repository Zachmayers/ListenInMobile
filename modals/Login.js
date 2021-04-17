import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, Button, TouchableOpacity, Modal, Dimensions} from 'react-native';
import axios from 'axios';
import Home from './Home'

// import RoundButton from '../components/button/RoundButton'

export default function Login( props ) {

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    // const [canLogin, setCanLogin] = useState(false);
    const [homeOpen, setHomeOpen] = useState(false);


    function submitLogin() {
        axios.post('http://cop4331g15.herokuapp.com/api/Login', {
            Username: user,
            Password: password
        }).then(response => {
            response.status == '442' ? setHomeOpen(false) : setHomeOpen(true);
        }).catch(e => {
            console.log(e);
        })
    }

    // Testing
    // easy
    
    // Check typeof undefined == undefined for variables that may not exist in url/tracks

    return (
        <ImageBackground style={styles.background} source={require('../assets/bluePurpleBG.jpg')}>
            <View style={styles.modalBackground}>

            <Text style={ styles.title }>Login</Text>
            <View style={ {top: 25} }>
                <TextInput
                    style={styles.textInput}
                    placeholder='Email'
                    onChangeText={user => setUser(user)}
                    />
                <TextInput
                    style={styles.textInput}
                    placeholder='Password'
                    onChangeText={password => setPassword(password)}
                    secureTextEntry={true}
                    />
            </View>

            <TouchableOpacity onPress={submitLogin}>
                <View style={ styles.button }>
                    <Text style={ styles.buttonText }>SUBMIT</Text>
                </View>
            </TouchableOpacity>

            <Button onPress={() => props.updateModal(false)} title="Close" />

            <Modal visible={homeOpen} animationType='fade'>
                <Home updateModal={setHomeOpen} />
            </Modal>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    modalBackground:
    {
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