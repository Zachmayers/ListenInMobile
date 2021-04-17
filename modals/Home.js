import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Image, ImageBackground, Text, KeyboardAvoidingView, Modal, TouchableOpacity, Dimensions } from 'react-native';
import base64 from 'react-native-base64';
import { ClientId, ClientSecret } from './Credentials';
import { Compliment } from './Compliments';
import axios from 'axios';

export default function Home( props ) {

  // Save tracks in a card array
  const [card, setCard] = useState([]);
  // Check to see if API is loading when searching for a user
  const [loading, isLoading] = useState(true);
  // Used to reset counter to not go out of bounds of card array
  const [add, setAdd] = useState(0);
  // Used to load a random compliment
  const [random, setRandom] = useState(0);
  // Used to record username for Spotify API search (the Spotify username)
  const [input, setInput] = useState('');
  // Instructs user how to use home page, switches to 'Loading...' later
  const [state, setState] = useState('Enter User');

  // Increments value to loop through each card one by one and also sets a random number for a compliment
  const incrementAndRandom = () => {
    setAdd((add + 1) % card.length);
    let number = Math.floor(Math.random() * Compliment.length);
    setRandom(number);
  }

  // Used to call the Spotify API, user's playlits, and tracks of that playlist
  const callAPI = () => 
  {
    // Start looping through songs at first index
    setAdd(0);
    // Username must be searched
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
          // Push all promises into an array to resolve all promises and perform additional code after API has officially loaded
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
                  playlist: playlistResponse.data.items[i].name ? playlistResponse.data.items[i].name : '',
                  artist: trackResponse.data.items[j].track.album.artists[0].name ? trackResponse.data.items[j].track.album.artists[0].name : '',
                  song: trackResponse.data.items[j].track.name ? trackResponse.data.items[j].track.name : '',
                  url: trackResponse.data.items[j].track.album.images[1].url ? trackResponse.data.items[j].track.album.images[1].url : ''
                });
              }
            })
            .catch(e => { 
              console.log(e) 
            })
          );
        }

        // All Spotify APIs must be done running to run the following code
        Promise.all(promises).then(() => {
          setCard(tempCard);
          isLoading(false);
          setState('Loading...');
        });          
      })
      .catch(e => {
        console.log(e);
      })
    });
  }

  // Content of the page
  return (
    <ImageBackground style={styles.modalBackground} source={require('../assets/bluePurpleBG.jpg')}>
      <KeyboardAvoidingView style={{flex: 1, top: 30}} behavior='padding'>

        <View style={styles.searchBanner}>
          <TextInput style={styles.input} placeholder='Enter Username' onChangeText={name => setInput(name)} />
          <Button style={{width: 80, height: 40}} onPress={callAPI} title='Search User' />
        </View>

        {/* Checks if page is stationary or if user searchers for a name */}
        {loading ? (
          <View>
            <Text style={styles.loading}>{state}</Text>
            <View style={{top: 395, left: 150, width: 80, alignContent: 'center'}}>
              <Button title='  Logout  ' onPress={() => props.updateModal(false)}/>
            </View>
          </View>

          ) : (

          <View style={{alignItems: 'center'}}>

            <View style={styles.polaroid}>
              <View style={styles.shadow}>
                <Image style={styles.image} source={{uri: card[add].url }} />
              </View>

              <Text style={[styles.polaroidText, {fontWeight: 'bold', fontSize: 20}]}>{card[add].playlist}</Text>
              <Text style={[styles.polaroidText, {top: 50, fontSize: 18, textAlign: 'center'}]}>{card[add].artist} - {card[add].song}</Text>
              <Text style={[styles.polaroidText, {top: 70, fontSize: 15, textAlign: 'center', fontStyle: 'italic', color: 'rgb(75, 75, 75)'}]}>"{Compliment[random]}"</Text>
            </View>

            <View style={styles.buttonBottom}>
              <Button style={{top: 40}} onPress={incrementAndRandom} title='Load Next' />
              <Button styles={{top: 50}} title='  Logout  ' onPress={() => props.updateModal(false)}/>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

// Styles
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
  },
  polaroidText: {
    top: 40,
    color: 'black',
    flexShrink: 1,
  },
  loading: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 40,
    top: 200,
    left: 95,
  },
  buttonBottom: {
    width: 200,
    top: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});