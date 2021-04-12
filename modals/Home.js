import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Image, ImageBackground, Text, Modal, TouchableOpacity } from 'react-native';

import base64 from 'react-native-base64';
import { ClientId, ClientSecret } from './Credentials';
import axios from 'axios';


export default function Home() {

  // INSTALLED:
  //  npm install --save react-native-base64
  //  npm install axios

  // const spotify = Credentials();
  // This is temporary, find a way to store in 'Credentials.js'
  // const ClientId = '03c67f932dff416184ddc219b8c56a8c';
  // const ClientSecret = '7cf4430a4fa849c9a0200563277463b5';

  const [token, setToken] = useState('');
  const [playlist, setPlaylist] = useState([]);


  useEffect(() => {

    // Get permission from Spotify by sending token
    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + base64.encode(ClientId + ':' + ClientSecret)
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
    .then(tokenResponse => {
      // USESTATE TOKEN
      setToken(tokenResponse.data.access_token);

      // Fetch all public playlists from a user
      axios('https://api.spotify.com/v1/users/theadoxbox/playlists', {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
      })
      .then(playlistResponse => {
        // USESTATE: setPlaylist(playlistResponse.items);

        // Fetch all tracks from all public playlists from a user
        for (let i = 0; i < playlistResponse.data.total; i++)
        {
          // Fetching all tracks from all playlists
          axios(playlistResponse.data.items[i].tracks.href, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
          })
          .then(trackResponse => {
            ////////////////////////
            // TESTING CODE
            // console.log(trackResponse.data.items[0].track.album.images[1].url);
            ////////////////////////

            // Printing playlist name followed by all tracks for that playlist
            console.log('============ ' + playlistResponse.data.items[i].name + ' ============');

            // Printing in format of '#.) <Track Name>'
            for (let j = 0; j < trackResponse.data.total; j++)
            {
              console.log((j + 1) + '.) ' + trackResponse.data.items[j].track.name);
              
              ///////////////
              if (trackResponse.data.items[j].track.album.images[1].url)
                console.log('URL: ' + trackResponse.data.items[j].track.album.images[1].url);
              ///////////////
                console.log();
            }
          })
          // Used to catch and print errors
          // .catch(e => {
          //   console.log(e);
          // })

        }
      })

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