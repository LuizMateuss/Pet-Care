import { useState, useRef } from 'react'
import { VStack, Text, Image, HStack, Modal } from 'native-base'
import MapView, { Marker } from 'react-native-maps'

import { Button } from '../components/Button'
import { Header } from '../components/Header'

import { useNavigation } from '@react-navigation/native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Input } from '../components/Input'

export function SelectLocal({ route }) {
  const navigation = useNavigation()

  const { isCare, user, newName, newEmail, newPhone } = route.params
  console.log(route.params)
  const mainColor = isCare ? '#00ABBC' : '#511AC7'

  const [pickupAndDropCords, setPickupAndDropCords] = useState({
    latitude: -23.966185579866277,
    longitude: -46.337672487834844,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221
  })
  const [destination, setDestination] = useState(null)
  const [address, setAddress] = useState()
  const [addressComplement, setAddressComplement] = useState('')
  const [showModal, setShowModal] = useState(false)

  async function changeAddressAndNextPage() {
    if (address.complemento === '') {
    }
    await fetch(
      `${process.env.SERVER_LINK}updateUser/${user.id}/${newName}/${newEmail}/${newPhone}/${address.cep}/${address.numero}/${address.logradouro}/${address.complemento}/${address.bairro}/${address.localidade}/${address.uf}`,
      {
        method: process.env.SERVER_METHOD,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    ).catch(() => {
      verify = false
      Alert.alert(
        'Desulpe!',
        'Estamos enfrentando problemas de conexão, por favor tente novamente mais tarde.'
      )
    })
    console.log(
      `${process.env.SERVER_LINK}updateUser/${user.id}/${newName}/${newEmail}/${newPhone}/${address.cep}/${address.numero}/${address.logradouro}/${address.complemento}/${address.bairro}/${address.localidade}/${address.uf}`
    )
    navigation.goBack()
  }

  return (
    <VStack bg="white" h="100%">
      <Header title="Selecionar local" color={mainColor} />

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
          setAddress({
            numero: details.address_components[0].long_name,
            logradouro: details.address_components[1].long_name,
            bairro: details.address_components[2].long_name,
            localidade: details.address_components[3].long_name,
            uf: details.address_components[4].short_name,
            complemento: addressComplement,
            cep: details.address_components[6].long_name
          })
          await AsyncStorage.setItem('@petcare:coords', JSON.stringify(details))
        }}
        query={{
          key: process.env.GOOGLE_MAP_API_KEY,
          language: 'pt-BR',
          components: 'country:br'
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
      <Button
        bg="transparent"
        color={mainColor}
        borderWidth={1}
        borderColor={mainColor}
        title="Adicionar complemento"
        weight="black"
        py={4}
        px={8}
        mt={10}
        w="80%"
        onPress={() => setShowModal(true)}
      />
      <Text
        bg={mainColor}
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
          borderColor={mainColor}
          borderWidth={1}
          color={mainColor}
          px={4}
          w="40%"
          onPress={changeAddressAndNextPage}
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
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content
          bg={mainColor}
          w="80%"
          p={4}
          borderRadius={20}
          alignItems="center"
        >
          <Input
            placeholder="Complemento:"
            onChangeText={setAddressComplement}
          />
          <Button
            bg="transparent"
            borderColor="white"
            borderWidth={1}
            title="Concluído"
            w="100%"
            py={4}
            px={8}
            onPress={() => setShowModal(false)}
          />
        </Modal.Content>
      </Modal>
    </VStack>
  )
}
