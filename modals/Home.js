import React, { useState, useEffect, useStateRef } from 'react';
import { StyleSheet, View, TextInput, Button, Image, ImageBackground, Text, KeyboardAvoidingView, Modal, TouchableOpacity, Dimensions } from 'react-native';

import base64 from 'react-native-base64';
import { ClientId, ClientSecret } from './Credentials';
import { Compliment } from './Compliments';

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
  const [random, setRandom] = useState(0);
  const [input, setInput] = useState('');
  // const [searchUser, setSearchUser] = useState(false);

  // const searchUserFunction = () => {
  //   setSearchUser(true);
  // }

  const incrementAndRandom = () => {
    setAdd((add + 1) % card.length);
    let number = Math.floor(Math.random() * Compliment.length);
    setRandom(number);
  }

  const callAPI = () => 
  {
    // Start looping through songs at first index
    setAdd(0);

    isLoading(true);

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
        axios(`https://api.spotify.com/v1/users/${input}/playlists`, {
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
        })
        .catch(e => {
          console.log(e);
        })
      });
    // }, []);
  }

  return (

    <ImageBackground style={styles.modalBackground} source={require('../assets/bluePurpleBG.jpg')} style={ styles.modalBackground }>

      <KeyboardAvoidingView style={{flex: 1}} behavior='padding'>

        <View style={styles.searchBanner}>
          <TextInput style={styles.input} placeholder='Enter Username' onChangeText={name => setInput(name)} />
          <Button style={{width: 80, height: 40}} onPress={callAPI} title='Search User' />
        </View>

        {loading ? (
          <Text style={styles.loading}>Loading...</Text>
          ) : (
          <View style={{alignItems: 'center'}}>

            <View style={styles.polaroid}>
              <View style={styles.shadow}>
                <Image style={styles.image} source={{uri: card[add].url }} />
              </View>
              <Text style={styles.polaroidText}>{card[add].playlist}</Text>
              <Text style={styles.polaroidText}>{card[add].artist}</Text>
              <Text style={styles.polaroidText}>{card[add].song}</Text>
            </View>

            <Text style={{color: 'white'}}>{ Compliment[random] }</Text>
            <Button style={{top: 40}} onPress={incrementAndRandom} title='Load Next' />
            <Button styles={{top: 50}} title='LOGOUT' />
          </View>
        )}
      
      </KeyboardAvoidingView>

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
        position: 'absolute',
        left: 0,
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
  searchBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    top: 40,
    paddingLeft: 17,
      
  },
  input: {
    width: 183,
    height: 40,
    margin: 12,
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 50,
    textAlign: 'center'
  },
  image: {
    width: 275,
    height: 200,
    borderRadius: 3,
    borderWidth: 50,
    // left: -37,
  },
  polaroid: {
    backgroundColor: 'white',
    borderRadius: 3,
    top: 40,
    width: 300,
    height: 400,
    alignItems: 'center',
    borderColor: 'black',
  },
  shadow: {
    width: 275,
    height: 200,
    elevation: 8,
    backgroundColor:'#d9d9d9',
    top: 20,
    // shadowColor: "#000000",
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // shadowOffset: {
    //   height: 1,
    //   width: 1
    // }
  },
  polaroidText: {
    top: 40,
    color: 'black',
  },
  loading: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 40,
    top: 250,
    left: 95,
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