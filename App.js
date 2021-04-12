import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Image, ImageBackground, Text, Modal, TouchableOpacity } from 'react-native';

import RoundButton from './components/button/RoundButton'
import Login from './modals/Login'
import SignIn from './modals/SignIn'
import ResetPassword from './modals/ResetPassword'
import Home from './modals/Home'
import ListenInIcon from './assets/Title-img-1.svg'

export default function App() {

  const [loginOpen, setLoginOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);

  return (
    <ImageBackground source={require('./assets/bluePurpleBG.jpg')} style={ styles.background }>

      {/* ListenIn title */}
      <View>
        <ListenInIcon height={250} width={250} />
      </View>
      
      {/* Logo png */}
      <Image style={ styles.logo } source={require('./assets/Logo-Pink.png')} />

      {/* Login Button and Sign Up Button */}
      <View style={ styles.alignButton }> 
        <RoundButton updateModal={setLoginOpen} title='Login'/>
        <RoundButton updateModal={signInOpen => setSignInOpen(signInOpen)} title='Sign Up' />
      </View>
      
      {/* Reset password */}
      <TouchableOpacity style={{bottom: 100}} onPress={() => setResetOpen(true)}>
        <View>
        <Text style={ {color: 'white', fontWeight: 'bold'}}>
          Reset Password
        </Text>
        </View>
      </TouchableOpacity>

      {/* Login Modal */}
      <Modal visible={loginOpen} animationType='slide'>
        <Login updateModal={setLoginOpen} />
      </Modal>

      {/* Sign In Modal */}
      <Modal visible={signInOpen} animationType='slide' >
        <SignIn updateModal={setSignInOpen} />
      </Modal>

      {/* Reset Password Modal */}
      <Modal visible={resetOpen} animationType='slide'>
        <ResetPassword updateModal={setResetOpen}/>
      </Modal>

      {/* Home page modal */}
      <Modal visible={true} animationType='fade'>
        <Home />
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
