/*
npm install react-native-maps --save-exact
expo install expo-location
expo install expo-permissions
npm install react-native-google-places-autocomplete --save
npm install react-native-maps-directions
npm install @react-navigation/native
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-masked-view/masked-view
npm install @react-navigation/stack
*/

import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect,useRef} from 'react';
import { Text, View, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import {css} from '../assets/cssmap/Cssmap';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import config from '../config';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import { MaterialIcons } from '@expo/vector-icons';
//seria a página inicial do app

export default function Map() {

    const mapEl=useRef(null);
    const [origin, setOrigin]=useState(null);
    const [destination, setDestination]=useState(null);
    const [distance, setDistance]=useState(null);
    const [price,setPrice]=useState(null);
    const [address, setAddress]=useState(null);

    //para fazer com o que o tutor consiga ver em tempo real o cuidador, pegaria a origin do cuidador e deixaria o destination fixa e com 'getCurrentPositionAsync' ai atualizando a posição do cuidador

    useEffect(()=>{
        (async function(){
            const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
            if (status === 'granted') {
                let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
                setOrigin({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.000922,
                    longitudeDelta: 0.000421
                })
            } else {
                throw new Error('Location permission not granted');
            }
        })();
    },[]);

  return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={css.container}>
        <MapView
            style={css.map}
            initialRegion={origin}
            showsUserLocation={true}
            zoomEnabled={false}
            loadingEnabled={true}
            ref={mapEl}
        >
            {destination &&
                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={config.googleApi}
                    strokeWidth={3}
                    onReady={result=>{
                        setDistance(result.distance);
                        setPrice(result.distance*3); //aqui setamos o preço do serviço
                        mapEl.current.fitToCoordinates(
                            result.coordinates,{
                                edgePadding:{
                                    top:50,
                                    bottom:50,
                                    left:50,
                                    right:50
                                }
                            }
                        );
                    }
                    }
                />
            }
        </MapView>

      <View style={css.search}>
        <GooglePlacesAutocomplete
            placeholder='Para onde vamos?'
            onPress={(data, details = null) => {
                setAddress(data.description);
                setDestination({
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                    latitudeDelta: 0.000922,
                    longitudeDelta: 0.000421
                });
            }}
            query={{
                key: config.googleApi,
                language: 'pt-br',
            }}
            enablePoweredByContainer={false}
            fetchDetails={true}
            styles={{
                listView:{backgroundColor:'#fff', zIndex:10},
                container:{position:'absolute',width:'100%'}
            }}
        />

        {distance &&
            <View style={css.distance}>
                <Text style={css.distance__text}>Distância: {distance.toFixed(2).replace('.',',')}km</Text>
                <TouchableOpacity style={css.price} onPress={() => props.navigation.navigate('MapCheckout',{price: price.toFixed(2),address:address})}>
                    <Text style={css.price__text}><MaterialIcons name="payment" size={24} color="white" /> Mercado Pago</Text>
                </TouchableOpacity>
            </View>
        }
      </View>
    </KeyboardAvoidingView>
  );
}

