import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Modal } from 'react-native';

import RoundButton from './components/button/RoundButton'
import ListenInIcon from './assets/Title-img-1.svg'

export default function App() {
  return (
    <ImageBackground source={require('./assets/bluePurpleBG.jpg')} style={ styles.background }>
      {/* ListenIn title */}
      <View>
        <ListenInIcon height={250} width={250} />
      </View>
      {/* Logo png */}
      <Image style={ styles.logo } source={require('./assets/Logo-Pink.png')} />
      {/* Buttons */}
      <View style={ styles.alignButton }>
        <RoundButton title='Login' />
        <RoundButton title='Sign Up' />
      </View>
      {/* Reset password */}
      <Text style={ {color:'white', fontWeight: 'bold'} }>Reset Password</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    // flex: 1,
    backgroundColor: '#6d74f2',
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
    paddingTop: 30,
    justifyContent: 'space-evenly'
  },
  logo: {
    bottom: 100
  },
  alignButton:
  {
    height: 100,
    alignItems: 'center',
    justifyContent: 'space-between',
    bottom: 120
  },
  button: {
    width: 100,
    height: 15,
  }
});
