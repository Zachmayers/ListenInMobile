import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Image, ImageBackground, Text, Modal, TouchableOpacity } from 'react-native';

import RoundButton from './components/button/RoundButton'
import Login from './modals/Login'
import SignIn from './modals/SignIn'
import ResetPassword from './modals/ResetPassword'
import ListenInIcon from './assets/Title-img-1.svg'

export default function App() {

  const [resetOpen, setResetOpen] = useState(false);

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
        <RoundButton title='Login'/>
        <RoundButton title='Sign Up' />
      </View>
      {/* Reset password */}
      <TouchableOpacity style={{bottom: 100}} onPress={() => setResetOpen(true)}>
        <View>
        <Text style={ {color: 'white', fontWeight: 'bold'}}>
          Reset Password
        </Text>
        </View>
      </TouchableOpacity>

      {/* MUST HAVE ROUND BUTTON COMPONENT TRIGGER STATE BELOW */}
      <Modal visible={false}>
        <Login />
      </Modal>
      <Modal visible={false}>
        <SignIn />
      </Modal>
      <Modal visible={resetOpen}>
        <ResetPassword />
      </Modal>

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
  }
});
