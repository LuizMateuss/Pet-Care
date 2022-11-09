import { VStack, Text, HStack, Image, ScrollView } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { Button } from '../components/Button'
import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useState, useEffect } from 'react'

export function EditProfile({ route }) {
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const { isCare, user } = route.params
  const mainColor = isCare ? '#00ABBC' : '#511AC7'

  const [newName, setNewName] = useState(user.name)
  const [newEmail, setNewEmail] = useState()
  const [newPhone, setNewPhone] = useState()
  const [userInformations, setUserInformations] = useState('')
  const [address, setAddress] = useState('')

  async function getAddressInformations() {
    const req = await fetch(
      `${process.env.SERVER_LINK}addressInformations/${user.id}`,
      {
        method: process.env.SERVER_METHOD,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
    const res = await req.json()
    setAddress({
      street: res[0].nm_logradouro,
      houseNumber: res[0].cd_numero_rua,
      complement: res[0].nm_complemento,
      district: res[0].nm_bairro,
      zipCode: res[0].cd_cep,
      city: res[0].nm_cidade,
      uf: res[0].nm_uf
    })
    setNewEmail(res[0].nm_email)
    setNewPhone(res[0].cd_telefone)
  }

  async function bdRegisterAdd() {
    await fetch(
      `${process.env.SERVER_LINK}updateUser/${user.id}/${newName}/${newEmail}/${newPhone}/${address.zipCode}/${address.houseNumber}/${address.street}/${address.complement}/${address.district}/${address.city}/${address.uf}`,
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
    handleNextPage()
  }

  function handleNextPage() {
    navigation.goBack()
  }

  function verfiyFieldsAndAddAddressToObject() {
    bdRegisterAdd()
  }

  useEffect(() => {
    getAddressInformations()
  }, [isFocused])

  return (
    <VStack>
      <Header title="Editar perfil" color={mainColor} />

      <ScrollView h="85%" keyboardShouldPersistTaps="always">
        <HStack
          justifyContent="space-between"
          w="80%"
          mx="auto"
          alignItems="center"
          mt={5}
        >
          <VStack>
            <Image
              alt="Imagem usuário"
              source={require('../../assets/img/anonymous.png')}
              w={100}
              h={100}
              borderRadius={50}
            />
            <TouchableOpacity>
              <Text fontSize={16} fontWeight="black" color={mainColor}>
                Alterar imagem
              </Text>
            </TouchableOpacity>
          </VStack>
          <VStack alignItems="center">
            <Text fontSize={16} fontWeight="black" color={mainColor}>
              Nome usuário
            </Text>
            <Text fontSize={16} fontWeight="black" color={mainColor}>
              Alterar nome de usuário
            </Text>
            <Input
              borderWidth={1}
              borderColor={mainColor}
              value={newName}
              onChangeText={setNewName}
            />
          </VStack>
        </HStack>
        <VStack bg={mainColor} w="90%" p={4} mx="auto" borderRadius={10} mt={5}>
          <VStack>
            <Text
              color="white"
              textAlign="center"
              fontWeight="black"
              fontSize={16}
              mb={2}
            >
              Endereço selecionado:
            </Text>
            <Text
              bg="white"
              color={mainColor}
              fontWeight="black"
              fontSize={16}
              p={4}
              borderRadius={20}
            >
              {address.zipCode === '' || address.zipCode === undefined
                ? ''
                : `${address.street}, Nº ${address.houseNumber}${
                    address.complement === '' || address.complement == null
                      ? ' '
                      : ', Comp: ' + address.complement
                  }.\nBairro: ${address.district}.\nCEP: ${address.zipCode}, ${
                    address.city
                  }/${address.uf}`}
            </Text>
            <Button
              bg="transparent"
              color="white"
              borderWidth={1}
              borderColor="white"
              title="Alterar endereço"
              py={4}
              px={8}
              mt={4}
              w="100%"
              onPress={() =>
                navigation.navigate('selectLocal', {
                  isCare,
                  user,
                  newName,
                  newEmail,
                  newPhone
                })
              }
            />
          </VStack>
        </VStack>
        <VStack bg={mainColor} w="90%" p={4} mx="auto" borderRadius={10} mt={5}>
          <Text
            color="white"
            fontWeight="black"
            fontSize={18}
            textAlign="center"
          >
            Alterar dados de contato
          </Text>
          <HStack alignItems="center" justifyContent="space-between">
            <Text color="white" fontWeight="black" fontSize={16}>
              E-mail:
            </Text>
            <Input w="50%" value={newEmail} onChangeText={setNewEmail} />
          </HStack>
          <HStack alignItems="center" justifyContent="space-between">
            <Text color="white" fontWeight="black" fontSize={16}>
              Telefone:
            </Text>
            <Input w="50%" value={newPhone} onChangeText={setNewPhone} />
          </HStack>
        </VStack>
        <Button
          title="Salvar alterações"
          color={mainColor}
          borderWidth={1}
          borderColor={mainColor}
          width="60%"
          py={4}
          mt={4}
          onPress={() => verfiyFieldsAndAddAddressToObject()}
        />
      </ScrollView>
    </VStack>
  )
}
