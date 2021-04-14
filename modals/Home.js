import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Image, ImageBackground, Text, Modal, TouchableOpacity } from 'react-native';

import base64 from 'react-native-base64';
import { ClientId, ClientSecret } from './Credentials';
import axios from 'axios';


export default function Home() {

  // INSTALLED:
  //  npm install --save react-native-base64
  //  npm install axios

  const [token, setToken] = useState('');
  // const [playlist, setPlaylist] = useState([]);

  const [card, setCard] = useState([]);
  // let isApiLoaded = false;

  // let loadCardFlag = false;
  const [loading, isLoading] = useState(true);
  let userName = 'theadoxbox';


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
      // Set token to access token
      setToken(tokenResponse.data.access_token);

      // Fetch all public playlists from a user theadoxbox 12162983687
      axios(`https://api.spotify.com/v1/users/${userName}/playlists`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
      })
      .then(playlistResponse => {

        // Create temporary array to store all cards
        let tempCard = [];

        // Fetch all tracks from all public playlists from a user
        for (let i = 0; i < playlistResponse.data.total; i++)
        {
          // Fetching all tracks from all playlists
          axios(playlistResponse.data.items[i].tracks.href, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
          })
          .then(trackResponse => {

            let loadCardFlag = false;

            // Loop over tracks in each playlist
            for (let j = 0; j < trackResponse.data.total; j++)
            {
              
              // Store all cards into temporary array
              tempCard.push({
                // <View>
                //   <Text>{ playlistResponse.data.items[i].name }</Text>
                //   <Text>{ trackResponse.data.items[j].track.album.artists[0].name }</Text>
                //   <Text>{ trackResponse.data.items[j].track.name }</Text>
                // </View>

                // <Image source={trackResponse.data.items[j].track.album.images[1].url} />

                playlist: playlistResponse.data.items[i].name ? playlistResponse.data.items[i].name : '',
                artist: trackResponse.data.items[j].track.album.artists[0].name ? trackResponse.data.items[j].track.album.artists[0].name : '',
                song: trackResponse.data.items[j].track.name ? trackResponse.data.items[j].track.name : '',
              });
              // url: trackResponse.data.items[j].track.album.images[1].url ? trackResponse.data.items[j].track.album.images[1].url : ''
              // console.log(trackResponse.data.items[j].track.album.images[1].url);
              // if (tempCard.length == totalTracks) loadCardFlag = true;
            }
            
            // console.log('i: ' + i);
            // console.log('playlistResponse.data.total: ' + playlistResponse.data.total);
            // console.log(card[j].song);
            if (loadCardFlag)
            {
              console.log("card now set to tempCard and length printed");
              setCard(tempCard);
              console.log('card length: ' + card.length);
              console.log("Api no longer loading");
              isLoading(false);
              // console.log(card[0].artist);
            }
          })
          // console.log('reached here')
        }


        // Set card array to temporary array - prevents constant appending
        // for (let i = 0; i < card.length; i++)
        //   console.log(card[i]);
        // console.log(card.length);
        // console.log();
      })


    });

  }, []);

  // SampleFunction=(item)=>{
 
  //   Alert.alert(item);
 
  // }

  // while (!isApiLoaded) {}

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

      {/* <View style={{color: 'white'}}> */}
        { }
        {/* <Image style={{width: 100, height: 100}} source={{uri: 'https://i.scdn.co/image/ab67616d00001e02b8c0135a218de2d10a8435f5'}} /> */}
      {/* </View> */}

      {loading ? (
        <Text style={{color: 'white'}}>Loading</Text>
        ) : (
        <Text style={{color: 'white'}}>Done Loading</Text>
        // <Text style={{color: 'white'}}>{card[0].song}{card[16].song}</Text>
      )}

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