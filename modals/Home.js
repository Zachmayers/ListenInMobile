import React, { useState, useEffect, useStateRef } from 'react';
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
  const [loading, isLoading] = useState(true);
  const [add, setAdd] = useState(0);

  const addIncrement = () => {
    setAdd((add + 1) % card.length);
  }

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
        
        // Create an array of promises that need to be fulfilled
        let promises = [];
        // Create temporary array to store all cards
        let tempCard = [];

        // Fetch all tracks from all public playlists from a user
        for (let i = 0; i < playlistResponse.data.total; i++)
        {
          promises.push(
            // Fetching all tracks from all playlists
            axios(playlistResponse.data.items[i].tracks.href, {
              method: 'GET',
              headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
            })
            .then(trackResponse => {

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
                  url: trackResponse.data.items[j].track.album.images[1].url ? trackResponse.data.items[j].track.album.images[1].url : ''
                });
                // console.log(trackResponse.data.items[j].track.name);
                // if (tempCard.length == totalTracks) loadCardFlag = true;
              }
            })
            .catch(e => { 
              console.log(e) 
            })
          );
        }

        Promise.all(promises).then(() => {
          // console.log("card now set to tempCard");
          setCard(tempCard);
          isLoading(false);
          // console.log("Api no longer loading");
          // console.log(tempCard);
          // console.log();
        });
        
        // console.log('Should only print after promise fulfillment');
      })
    });
  }, []);
  // .then(() => {
  //   console.log(card);
  //   console.log('card length: ' + card.length);

  // });
  
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
        // <Text style={{color: 'white'}}>Done Loading</Text>
        <View style={{alignItems: 'center'}}>
          <Text style={{color: 'white'}}>{add}</Text>
          <Text style={{color: 'white'}}>{card[add].playlist}</Text>
          <Text style={{color: 'white'}}>{card[add].artist}</Text>
          <Text style={{color: 'white'}}>{card[add].song}</Text>
          <Text style={{color: 'white'}}>{card[add].url}</Text>
          <Image source={{uri: card[10].url}} />
        </View>
      )}
      <Button onPress={addIncrement} title='Load Next Card' />

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