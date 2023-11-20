import { useEffect, useState } from 'react'
import { Alert, TouchableOpacity } from 'react-native'
import { VStack, ScrollView, Image, Modal, Text } from 'native-base'

import { useNavigation } from '@react-navigation/native'
import { Button } from '../components/Button'
import MapView, { Marker } from 'react-native-maps'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { Input } from '../components/Input'

import { APIconnection } from '../api/connection';

export function RegisterAddress({ route }) {
  const [address, setAddress] = useState(null)
  const [addressComplement, setAddressComplement] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { isCare, user } = route.params

  const mainColor = isCare ? '#00ABBC' : '#511AC7'
  const [initialCords, setInitialCords] = useState({
    latitude: -23.966185579866277,
    longitude: -46.337672487834844,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221
  })
  const [destination, setDestination] = useState(null)

  /**
   *
   * -> Pega o cep como parâmetro.
   * -> Cria um constante que contém um regex.
   * -> Armazena o parâmetro dentro de uma variável.
   * -> Verifica se dentro do CEP contém traço, caso tenha substitua por "nada".
   * -> Testa se o CEP é valido com a máscara do Regex, se for válido, seta o CEP ao estado.
   * -> Se a minha validação for false o meu CEP permanece limpo.
   */

  async function bdRegisterAdd() {
    setIsLoading(true)
    if (address.erro) {
      return Alert.alert(
        'Endereço inválido!',
        'Porfavor, verifique os valores.'
      )
    }
    try {
      const res = await APIconnection(
          `/registration`, 
          {
              name: user.name,
              email: user.email,
              password: user.password,
              birthday: user.birthday,
              phone: user.phone,
              isCare: user.isCare,
              cpf: user.cpf,

              cep: address.cep,
              addressNumber: address.numero,
              logradouro: address.logradouro,
              addressComplement: addressComplement,
              bairro: address.bairro,
              localidade: address.localidade,
              uf: address.uf
          }
        );
      if(res){
          const User = {id: res.cd_usuario, name: res.nm_usuario}
          setIsLoading(false)
          handleNextPage(User)
      }
      else {
          Alert.alert("Desulpe!","Não foi possível realizar o cadastro")
          setIsLoading(false)

      }
    } catch (error) {
        console.error('error: ', error)
        Alert.alert("Desulpe!","Estamos enfrentando problemas de conexão, por favor tente novamente mais tarde.")
        setIsLoading(false)
    }
  }

  function handleNextPage(user) {
    if (isCare) {
      navigation.navigate('startPetCare', {
        isCare,
        user
      })
    } else {
      navigation.navigate('menuHamburguer', {
        screen: 'startPetCare',
        params: { isCare, user }
      })
    }
  }

  function verfiyFieldsAndAddAddressToObject() {
    if (address == '' || address == undefined || address == null) {
      return Alert.alert(
        'Endereço inválido!',
        'Porfavor, preencha os campos e verifique os valores.'
      )
    }
    setTimeout(bdRegisterAdd, 1)
    setIsLoading(false)
  }
  const navigation = useNavigation()

  function redirectViaCep(){
    Alert.alert(
      'Desculpe...', 
      'Estamos tendo dificuldades para autenticar o endereço com o Google.\nVocê será redirecionado para outra tela de cadastro',
      [
        {text: 'OK', onPress: () => navigation.navigate('registerAddressCep', { isCare, user })},
      ]
    )
  }
  return (
    <VStack bg="white" h="100%">
      <VStack h="55%">
        <MapView
          initialRegion={initialCords}
          region={initialCords}
          style={{
            width: '100%',
            flex: 1
          }}
        >
          {destination && (
            <Marker coordinate={destination}>
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
          )}
        </MapView>
      </VStack>
      <VStack h="20%">
        <GooglePlacesAutocomplete
          placeholder="Insira o local"
          enablePoweredByContainer={false}
          onFail={(error) => {
            console.error('Fail: ', error)
            redirectViaCep()
          }}
          onNotFound={(error) => {
            console.error('NotFound: ', error)
            redirectViaCep()
          }}
          onTimeout={(error) => {
            console.error('Timeout: ', error)
            redirectViaCep()
          }}
          onPress={async (data, details = null) => {
            setInitialCords({
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
              complemento: '',
              cep: details.address_components[6].long_name
            })
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
      </VStack>
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
        w="70%"
        onPress={() => setShowModal(true)}
      />
      <Button
        bg={mainColor}
        title="Adicionar endereço"
        weight="black"
        py={4}
        px={8}
        w="70%"
        onPress={verfiyFieldsAndAddAddressToObject}
        isLoading={isLoading}
      />
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
