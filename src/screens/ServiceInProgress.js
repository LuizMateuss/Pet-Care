import { Image, Text, VStack, View, useTheme } from 'native-base'
import MapView, { Marker } from 'react-native-maps'
import { PawPrint } from 'phosphor-react-native'
import { Button } from '../components/Button'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { useState, useRef, useEffect } from 'react'
import MapViewDirections from 'react-native-maps-directions'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function ServiceInProgress({ route }) {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: -23.966185579866277,
    longitude: -46.337672487834844,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221
  })
  const [address, setAddress] = useState()
  const mapRef = useRef()
  const { isCare, user } = route.params
  const mainColor = isCare ? '#00ABBC' : '#511AC7'
  const { colors } = useTheme()
  const navigation = useNavigation()

  async function handleAddress() {
    const response = await AsyncStorage.getItem('@petcare:coords')
    setAddress(JSON.parse(response))
  }

  useEffect(() => {
    handleAddress()
  }, [])
  return (
    <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
      <VStack bg="white">
        {address ? (
          <MapView
            ref={mapRef}
            initialRegion={currentLocation}
            style={{
              width: '100%',
              height: '45%',
              position: 'relative',
              zIndex: 0
            }}
          >
            <Marker
              coordinate={{
                latitude: address.geometry.location.lat,
                longitude: address.geometry.location.lng,
                latitudeDelta: 0.0322,
                longitudeDelta: 0.0221
              }}
            >
              <Image
                alt="Ícone local"
                source={
                  isCare
                    ? require('../../assets/img/pinGreen.png')
                    : require('../../assets/img/pinPurple.png')
                }
                w="25"
                h="25"
                resizeMode="contain"
              />
            </Marker>
            <Marker coordinate={currentLocation}>
              <Image
                alt="Ícone cuidador"
                source={
                  isCare
                    ? require('../../assets/img/petPoint.png')
                    : require('../../assets/img/petPointPurple.png')
                }
                w={25}
                h={25}
                resizeMode="contain"
              />
            </Marker>
            <MapViewDirections
              origin={currentLocation}
              destination={{
                latitude: address.geometry.location.lat,
                longitude: address.geometry.location.lng,
                latitudeDelta: 0.0322,
                longitudeDelta: 0.0221
              }}
              apikey={process.env.GOOGLE_MAP_API_KEY}
              strokeColor={mainColor}
              strokeWidth={5}
            />
          </MapView>
        ) : (
          <Text>Ops, algum problema ocorreu no endereço!</Text>
        )}

        <VStack
          position="relative"
          bottom={10}
          zIndex={1}
          w="full"
          bg="white"
          justifyContent="center"
          py={5}
          px={5}
          rounded={20}
        >
          {isCare ? (
            <></>
          ) : (
            <View mb={4}>
              <Button
                title="Chat"
                w="100%"
                color={mainColor}
                borderWidth={1}
                borderColor={mainColor}
                onPress={() => navigation.navigate('chat', { isCare, user })}
              />
            </View>
          )}
          <VStack
            bg={mainColor}
            py={5}
            rounded={20}
            alignItems="center"
            w="full"
          >
            <Image
              alt="Imagem pet"
              source={require('../../assets/img/PerfilAnimalImagem.png')}
              w={70}
              h={70}
              borderRadius={50}
            />

            {isCare ? (
              <View w="50%" m={2}>
                <Text
                  position="absolute"
                  zIndex={1}
                  p={1}
                  px={3}
                  ml={5}
                  top={-5}
                  right={1}
                  bg="#FFF"
                  borderRadius={40}
                >
                  1
                </Text>
                <Button
                  title="Chat"
                  borderWidth={1}
                  borderColor="white"
                  width="100%"
                  onPress={() => navigation.navigate('chat', { isCare, user })}
                />
              </View>
            ) : (
              <></>
            )}
            <View mt={2} alignItems="center">
              <Text color="white">Animal: Bob</Text>
              <Text color="white">Horário de início: 20:29</Text>
              <Text color="white">Tempo decorrente: xx:xx</Text>
              <Text color="white">Cliente: xxx-xxx</Text>
              <Text color="white">Valor do serviço: R$29,75</Text>
            </View>
          </VStack>
          {isCare ? (
            <VStack mt={4}>
              <Button
                title="Terminar passeio"
                color={colors.red[700]}
                borderWidth={1}
                width="100%"
                borderColor={colors.red[700]}
                onPress={() =>
                  navigation.navigate('startPetCare', { isCare, user })
                }
              />
            </VStack>
          ) : (
            <></>
          )}
        </VStack>
      </VStack>
    </SafeAreaView>
  )
}
