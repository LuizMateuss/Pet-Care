import { useState, useRef } from 'react'
import { VStack, Text, Image, HStack } from 'native-base'
import MapView, { Marker } from 'react-native-maps'
import { MagnifyingGlass } from 'phosphor-react-native'
import { Button } from '../components/Button'
import { Header } from '../components/Header'
import { Input } from '../components/Input'
import MapViewDirections from 'react-native-maps-directions'

export function SelectLocal() {
  const [initialCords, setInitialCords] = useState({
    pickupAndDropCords: {
      latitude: -23.966185579866277,
      longitude: -46.337672487834844,
      latitudeDelta: 0.0322,
      longitudeDelta: 0.0221
    },
    currentCords: {
      latitude: -23.97590347583942,
      longitude: -46.31840498403957,
      latitudeDelta: 0.0322,
      longitudeDelta: 0.0221
    }
  })
  const mapRef = useRef()
  const { pickupAndDropCords, currentCords } = initialCords
  return (
    <VStack bg="white" h="100%">
      <Header title="Selecionar local" color="#511AC7" />

      <MapView
        ref={mapRef}
        initialRegion={pickupAndDropCords}
        style={{
          width: '100%',
          height: 220,
          flex: 1
        }}
      >
        <Marker coordinate={pickupAndDropCords}>
          <Image
            alt="Ícone local"
            source={require('../../assets/img/pinPurple.png')}
            w="25"
            h="25"
            resizeMode="contain"
          />
        </Marker>
      </MapView>

      <VStack
        bg="white"
        borderWidth={1}
        borderColor="primary.700"
        borderRadius={40}
        w="80%"
        mx="auto"
        mt={10}
        mb={0}
        px={4}
        pb={4}
        position="relative"
        top={-60}
      >
        <Text
          bg="primary.700"
          borderRadius={40}
          fontWeight="black"
          fontSize={18}
          w="70%"
          mx="auto"
          color="white"
          textAlign="center"
          py={2}
          position="relative"
          bottom={5}
        >
          Local selecionado:
        </Text>
        <Text
          fontWeight="black"
          fontSize={16}
          color="primary.700"
          textAlign="center"
        >
          Rua Aletória Demais, Nº 666 - Ap. 11. CEP: 11545-111, Santos/SP.
        </Text>
      </VStack>
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
