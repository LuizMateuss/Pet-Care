import { Alert, TouchableOpacity } from 'react-native'
import { HStack, Image, Text, VStack, View, ScrollView } from 'native-base'

import { CaretLeft, MapPin } from 'phosphor-react-native'

import { useNavigation } from '@react-navigation/native'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { useEffect, useState } from 'react'

export function RegisterAddress({ route }) {
  const [cep, setCep] = useState()
  const [address, setAddress] = useState()
  const [addressNumber, setAddressNumber] = useState()
  const [addressComplement, setAddressComplement] = useState(null)
  const [userAddress, setUserAddress] = useState()

  const [isLoading, setIsLoading] = useState(false)

  const { isCare, user } = route.params
  const mainColor = isCare ? '#00ABBC' : '#511AC7'

  /**
   *
   * -> Pega o cep como parâmetro.
   * -> Cria um constante que contém um regex.
   * -> Armazena o parâmetro dentro de uma variável.
   * -> Verifica se dentro do CEP contém traço, caso tenha substitua por "nada".
   * -> Testa se o CEP é valido com a máscara do Regex, se for válido, seta o CEP ao estado.
   * -> Se a minha validação for false o meu CEP permanece limpo.
   */
  function handleZipCode(cep) {
    const zipCodeRegex = /^[0-9]{8}$/
    let zipCode = cep
    if (zipCode.includes('-')) {
      zipCode = zipCode.replace('-', '')
    }

    if (zipCodeRegex.test(zipCode)) {
      setCep(zipCode)
      fetch(`https://viacep.com.br/ws/${zipCode}/json/`)
        .then(response => response.json())
        .then(data => {
          setAddress(data)
        })
        .catch(err => {
          return Alert.alert('Falha na conexão')
        })
    } else {
      setAddress('')
    }
  }

  function handleAddressNumber(number) {
    let addressNumber = number.trim()
    if (!isNaN(addressNumber)) {
      setAddressNumber(addressNumber)
    }
  }

  function handleAddressComplement(complement) {
    let addressComplement = complement

    setAddressComplement(addressComplement)
  }

  async function bdRegisterAdd(){
    if(address.erro){
      return Alert.alert(
        'Endereço inválido!',
        'Porfavor, verifique os valores.'
      )
    }
    let addressComple
    if(addressComplement == ''){
      addressComple = null
    }else{
      addressComple=addressComplement
    }
    let verify = true
    const req = await fetch(`${process.env.SERVER_LINK}registration/${user.name}/${user.email}/${user.password}/${user.birthday}/${user.phone}/${user.isCare}/${address.cep}/${addressNumber}/${address.logradouro}/${addressComplement}/${address.bairro}/${address.localidade}/${address.uf}`,
      {
        method: process.env.SERVER_METHOD,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    ).catch(()=>{
      verify = false
      setIsLoading(false)
      Alert.alert("Desulpe!","Estamos enfrentando problemas de conexão, por favor tente novamente mais tarde.")
    })

    const res = await req.json()

    if(res){
      const User = {id: res.cd_usuario, name: res.nm_usuario}
      if(verify){
        handleNextPage(User)
      }
    }

  }

  function handleNextPage(user) {
    setIsLoading(false)
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
    if (address == '' || address == undefined || addressNumber == '') {
      return Alert.alert(
        'Endereço inválido!',
        'Porfavor, preencha os campos e verifique os valores.'
      )
    }
    let UserAddress = { address, addressNumber, addressComplement }
    setUserAddress(UserAddress)
    bdRegisterAdd()
  }
  const navigation = useNavigation()
  return (
    <ScrollView bg="white" keyboardShouldPersistTaps="always">
      <VStack mt={8} bg="white" h="100%">
        <Image
          alt="Imagem usuário"
          source={require('../../assets/img/anonymous.png')}
          h={100}
          w={100}
          mx="auto"
          borderRadius={50}
        />

        <Text
          textAlign="center"
          color={mainColor}
          fontSize={20}
          fontWeight="black"
          my={2}
        >
          Bem vindo {user.name}!
        </Text>

        <View
          borderBottomWidth={1}
          borderColor={mainColor}
          my={5}
          mx="auto"
          w="80%"
        ></View>

        <VStack
          bg={mainColor}
          alignItems="center"
          p={4}
          w="90%"
          mx="auto"
          borderRadius={15}
        >
          <MapPin size={20} color="#FFF" />
          <Text color="white" fontSize={18} fontWeight="black">
            Endereço
          </Text>

          <HStack alignItems="center" justifyContent="space-between" w="100%">
            <Text color="white" fontSize={15} fontWeight="black">
              Insira o CEP*:
            </Text>
            <Input
              ml={4}
              w="60%"
              onChangeText={cep => handleZipCode(cep)}
              maxLength={9}
            />
          </HStack>
          <HStack alignItems="center" justifyContent="space-between" w="100%">
            <Text color="white" fontSize={15} fontWeight="black">
              Número*:
            </Text>

            <Input
              ml={4}
              w="60%"
              onChangeText={number => handleAddressNumber(number)}
            />
          </HStack>
          <HStack alignItems="center" justifyContent="space-between" w="100%">
            <Text color="white" fontSize={15} fontWeight="black">
              Complemento:
            </Text>
            <Input
              ml={4}
              w="60%"
              onChangeText={complement => handleAddressComplement(complement)}
            />
          </HStack>

          <Text
            textAlign="center"
            color="white"
            fontSize={18}
            fontWeight="black"
          >
            Endereço selecionado:
          </Text>

          {address == undefined ||
          addressNumber == undefined ||
          address == '' ||
          addressNumber == '' ? (
            <Text
              textAlign="center"
              color="white"
              fontSize={18}
              fontWeight="black"
            >
              Não foi possível encontrar o endereço.
            </Text>
          ) : (
            <Text
              textAlign="center"
              color="white"
              fontSize={18}
              fontWeight="black"
            >
              {
                `${address.logradouro}, Nº ${addressNumber}${
                addressComplement==='' || addressComplement==null ? ' ' : ', Comp: '+addressComplement
                }.\nBairro: ${address.bairro}.\nCEP: ${address.cep}, ${address.localidade}/${address.uf}`
              }
            </Text>
          )}
        </VStack>

        <Button
          bg={mainColor}
          title="Adicionar endereço"
          weight="black"
          py={4}
          px={8}
          mt={10}
          onPress={verfiyFieldsAndAddAddressToObject}
        />
      </VStack>
    </ScrollView>
  )
}
