import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Image, ImageBackground, Text, Modal, TouchableOpacity } from 'react-native';

import base64 from 'react-native-base64';
import { Credentials } from './Credentials';
import axios from 'axios';

export default function Home() {

  // INSTALLED:
  //  npm install --save react-native-base64
  //  npm install axios

  // const spotify = Credentials();
  // This is temporary, find a way to store in 'Credentials.js'
  const ClientId = '03c67f932dff416184ddc219b8c56a8c';
  const ClientSecret = '7cf4430a4fa849c9a0200563277463b5';

  const [token, setToken] = useState('');
  const [playlist, setPlaylist] = useState([]);


  useEffect(() => {

    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + base64.encode(ClientId + ':' + ClientSecret)
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
    .then(tokenResponse => {
      console.log(tokenResponse.data.access_token);
      setToken(tokenResponse.data.access_token);

      // axios('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
      axios('https://api.spotify.com/v1/users/theadoxbox/playlists', {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
      })
      .then(playlistResponse => {
        console.log(playlistResponse.data);
        // setPlaylist(playlistResponse.items);
      });

    });

  }, []);

  // SampleFunction=(item)=>{
 
  //   Alert.alert(item);
 
  // }

  return (

    <ImageBackground source={require('../assets/bluePurpleBG.jpg')} style={ styles.modalBackground }>

      {/* <View>
        { playlist.map((item, key)=>(
          <Text key={key} onPress={ this.SampleFunction.bind(this, item) }> { item } </Text>)
        )}
      </View> */}

      {/* <View> */}
        {/* <Text>Hello</Text> */}
        {/* <Text> { playlist[0].name } </Text> */}
      {/* </View> */}

    </ImageBackground>

    // <View style={styles.container}>
    //   <View style={styles.formRow}>
    //     <View style={styles.formItem}>
    //       <Text>AutoComplete component goes here</Text>
    //     </View>
          
    //     <View style={styles.formIcon}>
    //       <Text>50px Icon</Text>
    //     </View>
    //   </View>
    // </View>
  );
}

const styles = StyleSheet.create({
  modalBackground:
    {
        backgroundColor: 'blue',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
  logout: {
      alignItems: 'flex-end'
  }
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 100
//   },
//   formRow: {
//     flexDirection: 'row',
//     height: 50,
//   },
//   formItem: {
//     flex: 1,
//     backgroundColor: 'dodgerblue',
//   },
//   formIcon: {
//     width: 50,
//     backgroundColor: 'greenyellow',
//   },
// });