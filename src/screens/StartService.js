import { useState, useEffect } from 'react'
import {
  Button as ButtonNativeBase,
  HStack,
  Text,
  VStack,
  View,
  useTheme,
  Image,
  Modal,
  ScrollView
} from 'native-base'

import { Button } from '../components/Button'

import { useNavigation } from '@react-navigation/native'
import MapView, { Marker } from 'react-native-maps'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function StartService({ route }) {
  const { colors } = useTheme()
  const [showModal, setShowModal] = useState(false)
  const [address, setAddress] = useState(null)
  const { isCare, user } = route.params
  const mainColor = isCare ? '#00ABBC' : '#511AC7'
  const navigation = useNavigation()

  function cancelService() {
    isCare
      ? navigation.navigate('startPetCare', { isCare, user })
      : navigation.navigate('menuHamburguer', { isCare, user })
    setShowModal(false)
  }

  async function handleAddress() {
    const response = await AsyncStorage.getItem('@petcare:coords')
    console.log(response)
    setAddress(JSON.parse(response))
  }

  useEffect(() => {
    handleAddress()
  }, [])

  return (
    <VStack bg="white" h="100%">
      {address ? (
        <MapView
          style={{
            width: '100%',
            height: '40%',
            position: 'relative',
            zIndex: 1
          }}
          region={{
            latitude: address.geometry.location.lat,
            longitude: address.geometry.location.lng,
            latitudeDelta: 0.00392,
            longitudeDelta: 0.003421
          }}
        >
          <Marker
            coordinate={{
              latitude: address.geometry.location.lat,
              longitude: address.geometry.location.lng,
              latitudeDelta: 0.00392,
              longitudeDelta: 0.003421
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
        </MapView>
      ) : (
        <Text>Ops, algum problema ocorreu no endereço!</Text>
      )}

      <VStack
        zIndex={2}
        bottom={10}
        w="full"
        bg="white"
        justifyContent="center"
        mt="1%"
        py={5}
        px={5}
        rounded={20}
      >
        <VStack
          bg={mainColor}
          py={5}
          rounded={20}
          alignItems="center"
          w="100%"
          mx="auto"
        >
          <Image
            alt="Imagem pet"
            source={require('../../assets/img/PerfilAnimalImagem.png')}
            w={70}
            h={70}
            borderRadius={50}
          />

          <View mt={2} alignItems="center">
            <Text color="white">Animal: Bob</Text>
            <Text color="white">Horário de início: xx:xx</Text>
            <Text color="white">Serviço: Passeio</Text>
            <Text color="white">Cuidador: xxx-xxx</Text>
          </View>
        </VStack>
        <VStack>
          {isCare ? (
            <Button
              title="Começar serviço"
              color={colors.cyan[700]}
              borderWidth={1}
              borderColor={colors.cyan[700]}
              my={1}
              w="100%"
              onPress={() =>
                navigation.navigate('serviceInProgress', { isCare, user })
              }
            />
          ) : (
            <Button
              title="Ver perfil do cuidador"
              color={mainColor}
              borderWidth={1}
              borderColor={mainColor}
              my={1}
              w="100%"
              onPress={() =>
                navigation.navigate('userProfile', { isCare, user })
              }
            />
          )}

          <Button
            title="Chat"
            color={mainColor}
            borderWidth={1}
            borderColor={mainColor}
            my={1}
            w="100%"
            onPress={() => navigation.navigate('chat', { isCare })}
          />
          <Button
            title="Cancelar"
            color={colors.red[700]}
            borderWidth={1}
            borderColor={colors.red[700]}
            my={1}
            w="100%"
            onPress={() => setShowModal(true)}
          />
        </VStack>
      </VStack>

      <Modal isOpen={showModal} onClose={() => setShowModal(!showModal)}>
        <View w="80%" bg="white" p={5}>
          <Text textAlign="center" fontSize={20}>
            Tem certeza que deseja cancelar?
          </Text>
          <Text textAlign="center" fontSize={15} my={5}>
            *Punições poderão ser aplicadas segundo os termos de serviço
          </Text>

          <Button
            title="Sim"
            color={colors.cyan[700]}
            borderWidth={1}
            borderColor={colors.cyan[700]}
            my={1}
            w="100%"
            onPress={cancelService}
          />
          <Button
            title="Cancelar"
            color={colors.red[700]}
            borderWidth={1}
            borderColor={colors.red[700]}
            my={1}
            w="100%"
            onPress={() => setShowModal(false)}
          />
        </View>
      </Modal>
    </VStack>
  )
}
