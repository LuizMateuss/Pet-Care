import { useState, useRef } from 'react'
import { VStack, Text, Image, HStack } from 'native-base'
import MapView, { Marker } from 'react-native-maps'

import { Button } from '../components/Button'
import { Header } from '../components/Header'

import { useNavigation } from '@react-navigation/native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function SelectLocal({ route }) {
  const navigation = useNavigation()
  const { isCare, user } = route.params

  const [pickupAndDropCords, setPickupAndDropCords] = useState({
    latitude: -23.966185579866277,
    longitude: -46.337672487834844,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221
  })
  const [destination, setDestination] = useState(null)

  function nextPage() {
    navigation.goBack()
  }

  return (
    <VStack bg="white" h="100%">
      <Header title="Selecionar local" color="#511AC7" />

      <MapView
        initialRegion={pickupAndDropCords}
        region={pickupAndDropCords}
        style={{
          width: '100%',
          height: 220,
          flex: 1
        }}
      >
        {destination && (
          <Marker coordinate={destination}>
            <Image
              alt="Ícone local"
              source={require('../../assets/img/pinPurple.png')}
              w="25"
              h="25"
              resizeMode="contain"
            />
          </Marker>
        )}
      </MapView>

      <GooglePlacesAutocomplete
        placeholder="Insira o local"
        onPress={async (data, details = null) => {
          setPickupAndDropCords({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.00392,
            longitudeDelta: 0.003421
          })
          setDestination({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.00392,
            longitudeDelta: 0.003421
          })
          await AsyncStorage.setItem('@petcare:coords', JSON.stringify(details))
        }}
        query={{
          key: process.env.GOOGLE_MAP_API_KEY,
          language: 'pt-BR'
        }}
        fetchDetails={true}
        styles={{
          textInputContainer: {
            backgroundColor: '#f2f2f2',
            paddingHorizontal: 5,
            paddingTop: 5
          },
          textInput: {
            color: '#5d5d5d',
            fontSize: 16
          }
        }}
      />
      <Text
        bg="primary.700"
        color="white"
        p={4}
        w="80%"
        mx="auto"
        fontSize={18}
        fontWeight="black"
        textAlign="center"
        borderRadius={40}
      >
        Confirmar neste endereço?
      </Text>
      <HStack justifyContent="space-between" w="80%" mx="auto" mt={0}>
        <Button
          title="Sim"
          borderColor="primary.700"
          borderWidth={1}
          color="primary.700"
          px={4}
          w="40%"
          onPress={() => nextPage()}
        />
        <Button
          title="Não"
          borderColor="red.700"
          borderWidth={1}
          color="red.700"
          px={4}
          w="40%"
        />
      </HStack>
    </VStack>
  )
}
