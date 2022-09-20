import { Alert, TouchableOpacity } from 'react-native'
import { HStack, Image, Text, VStack, View } from 'native-base'

import { CaretLeft, MapPin } from 'phosphor-react-native'

import { useNavigation } from '@react-navigation/native'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { useEffect, useState } from 'react'

export function RegisterAddress({ route }) {
  const [cep, setCep] = useState()

  const [address, setAddress] = useState('')
  const [addressNumber, setAddressNumber] = useState('')
  const [addressComplement, setAddressComplement] = useState('')

  const { isCare } = route.params
  const mainColor = isCare ? '#00ABBC' : '#511AC7'

  /**
   *
   * -> Pega o cep como parâmetro.
   * -> Cria um constante que contém um regex.
   * -> Armazena o parâmetro dentro de uma variável.
   * -> Verifica se dentro do CEP contém traço, caso tenha substitua por "nada".
   * -> Testa se o CEP é valido com a máscara do Regex, se for válido, seta o CEP ao estado.
   * -> Se meu CEP o tamanho dele for igual a zero, limpa o estado dele.
   */
  function handleZipCode(cep) {
    const zipCodeRegex = /^[0-9]{8}$/
    let zipCode = cep
    if (zipCode.includes('-')) {
      zipCode = zipCode.replace('-', '')
    }

    if (zipCodeRegex.test(zipCode)) {
      setCep(zipCode)
    } else {
      setCep('')
    }
  }

  function handleNumber(number) {
    let addressNumber = number
    if (addressNumber.length > 0 && Number(addressNumber)) {
      setAddressNumber(addressNumber)
    } else {
      setAddressNumber('')
    }
  }

  function handleComplement(complement) {
    let addressComplement = complement
    if (addressComplement.trim().length >= 0) {
      setAddressComplement(addressComplement)
    } else {
      setAddressComplement('')
    }
  }

  const navigation = useNavigation()
  return (
    <VStack mt={8} bg="white" h="100%">
      <View mx={4} mt={4}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <CaretLeft color={mainColor} size={20} />
        </TouchableOpacity>
      </View>

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
        Bem vindo !
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
            Insira o CEP:
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
            Número:
          </Text>

          <Input ml={4} w="60%" onChangeText={number => handleNumber(number)} />
        </HStack>
        <HStack alignItems="center" justifyContent="space-between" w="100%">
          <Text color="white" fontSize={15} fontWeight="black">
            Complemento:
          </Text>
          <Input
            ml={4}
            w="60%"
            onChangeText={complement => handleComplement(complement)}
          />
        </HStack>

        <Text textAlign="center" color="white" fontSize={18} fontWeight="black">
          Endereço selecionado:
        </Text>

        <Text textAlign="center" color="white" fontSize={16} fontWeight="black">
          Nenhum endereço encontrado
        </Text>
      </VStack>

      <Button
        bg={mainColor}
        title="Adicionar endereço"
        weight="black"
        py={4}
        px={8}
        mt={20}
      />
      <Button
        title="Confirmar endereço"
        weight="black"
        py={4}
        px={8}
        borderWidth={1}
        borderColor={mainColor}
        color={mainColor}
        onPress={() => navigation.navigate('')}
      />
    </VStack>
  )
}
