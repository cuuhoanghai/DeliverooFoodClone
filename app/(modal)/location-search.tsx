import { View, Text,StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import MapView from 'react-native-maps';
import Colors from '@/constants/Colors';
import { useNavigation } from 'expo-router';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Ionicons } from '@expo/vector-icons';

const locationSearch = () => {
    const navigation = useNavigation();
    const [location, setLocation] = useState({
        latitude: 51.5078788,
        longitude: -0.0877321,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      });
  return (
    <View style={{flex:1}}>
       <GooglePlacesAutocomplete
      placeholder='Search or move the map'
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      listViewDisplayed='auto'    // true/false/undefined
      fetchDetails={true}
      renderDescription={row => row.description} // custom description render
      onPress={(data, details) => { 
        const point = details?.geometry?.location;
        if(!point) return;
        setLocation({
          ...location,
          latitude:point.lat,
          longitude:point.lng,
        });
       
      }}
      
      getDefaultValue={() => ''}
      
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
        language: 'en', // language of the results
        types: '(cities)' // default: 'geocode'
      }}
      renderLeftButton={ () => (
        <View style={styles.boxIcon}>
          <Ionicons name="search-outline" size={24} color={Colors.medium} />
        </View>
    )}
      styles={{
        container:{
          flex:0,
        },
        textInput:{
          backgroundColor:Colors.grey,
          paddingLeft:35,
          borderRadius:10,
        },
        textInputContainer:{
          padding:8,
          backgroundColor:'#fff',
        }
      }}
      />
      <MapView showsUserLocation={true} style={styles.map} region={location}/>
      <View style={styles.absoluteBox}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    map:{
        flex:1,
    },
    absoluteBox:{
        position:'absolute',
        bottom:20,
        width:'100%',
    },
    button:{
        backgroundColor:Colors.primary,
        padding:16,
        margin:16,
        alignItems:'center',
        borderRadius:8,
    },
    buttonText:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:16,
    },
    boxIcon:{
      position:'absolute',
      left:15,
      top:18,
      zIndex:1,
    },
});
export default locationSearch;