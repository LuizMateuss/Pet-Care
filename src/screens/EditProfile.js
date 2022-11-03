import { VStack, Text, HStack, Image, ScrollView } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { Button } from '../components/Button'
import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'

export function EditProfile({ route }) {
  const navigation = useNavigation()
  const { isCare, user, address, userInformations, newUser } = route.params
  const mainColor = isCare ? '#00ABBC' : '#511AC7'

  const [newName, setNewName] = useState(user.name)
  const [newEmail, setNewEmail] = useState(userInformations.email)
  const [newPhone, setNewPhone] = useState(userInformations.phone)
  const [newHouseNumber, setNewHouseNumber] = useState(address.houseNumber)
  const [newComplement, setNewComplement] = useState(address.complement)
  const [newAddress, setNewAddress] = useState(address)

  function handleZipCode(cep) {
    const zipCodeRegex = /^[0-9]{8}$/
    let zipCode = cep
    if (zipCode.includes('-')) {
      zipCode = zipCode.replace('-', '')
    }

    if (zipCodeRegex.test(zipCode)) {
      fetch(`https://viacep.com.br/ws/${zipCode}/json/`)
        .then(response => response.json())
        .then(data => {
          setNewAddress({
            city: data.localidade,
            complement: newAddress.complement,
            district: data.bairro,
            houseNumber: newAddress.houseNumber,
            street: data.logradouro,
            uf: data.uf,
            zipCode: data.cep,
          })
        })
        .catch(err => {
          return Alert.alert('Falha na conexão')
      })
    }
    else {
      setNewAddress('')
      setNewHouseNumber('')
      setNewComplement('')
    }
  }

  function handleAddressNumber(number) {
    let addressNumber = number.trim()
    if (!isNaN(addressNumber)) {
      setNewHouseNumber(addressNumber)
    }
  }

  function handleAddressComplement(complement) {
    let addressComplement = complement
    setNewComplement(addressComplement)
  }

  async function bdRegisterAdd(){
    if(newAddress.erro){
      return Alert.alert(
        'Endereço inválido!',
        'Por favor, verifique os valores.'
      )
    }
    let addressComple
    if(newComplement == ''){
      addressComple = null
    }else{
      addressComple=newComplement
    }

    await fetch(`${process.env.SERVER_LINK}updateUser/${user.id}/${newName}/${newEmail}/${newPhone}/${newAddress.zipCode}/${newHouseNumber}/${newAddress.street}/${newComplement}/${newAddress.district}/${newAddress.city}/${newAddress.uf}`,
      {
        method: process.env.SERVER_METHOD,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    ).catch(()=>{
      verify = false
      Alert.alert("Desulpe!","Estamos enfrentando problemas de conexão, por favor tente novamente mais tarde.")
    })

    let verifyNewUser = !newUser
    handleNextPage(verifyNewUser)
  }

  function handleNextPage(verifyNewUser) {
    let newUser = verifyNewUser
    navigation.navigate('profileCare', {
      isCare,
      user,
      newUser
    })
  }

  function verfiyFieldsAndAddAddressToObject() {
    if (newAddress == '' || newAddress == undefined || newHouseNumber == '') {
      return Alert.alert(
        'Endereço inválido!',
        'Por favor, preencha os campos e verifique os valores.'
      )
    }
    bdRegisterAdd()
  }

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
            <Input borderWidth={1} borderColor={mainColor} value={newName} onChangeText={setNewName}/>
          </VStack>
        </HStack>
        <VStack bg={mainColor} w="90%" p={4} mx="auto" borderRadius={10} mt={5}>
          <Text
            color="white"
            textAlign="center"
            fontWeight="black"
            fontSize={18}
          >
            Alterar endereço
          </Text>
          <HStack justifyContent="space-between">
            <VStack w="40%">
              <Text color="white" fontWeight="black" fontSize={16}>
                Insira o CEP:
              </Text>
              <Input value={newAddress.zipCode} onChangeText={cep => handleZipCode(cep)}/>
            </VStack>
            <VStack w="40%">
              <Text color="white" fontWeight="black" fontSize={16}>
                Número:
              </Text>
              <Input value={newHouseNumber} onChangeText={number => handleAddressNumber(number)}/>
            </VStack>
          </HStack>
          <HStack alignItems="center" justifyContent="space-between">
            <Text color="white" fontWeight="black" fontSize={16}>
              Complemento:
            </Text>
            <Input w="50%" value={newComplement} onChangeText={complement => handleAddressComplement(complement)}/>
          </HStack>
          <VStack>
            <Text color="white" fontWeight="black" fontSize={16}>
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
              {
                newAddress.zipCode==='' || newAddress.zipCode===undefined ? '' :
                `${newAddress.street}, Nº ${newHouseNumber}${
                newComplement==='' || newComplement==null ? ' ' : ', Comp: '+newComplement
                }.\nBairro: ${newAddress.district}.\nCEP: ${newAddress.zipCode}, ${newAddress.city}/${newAddress.uf}`
              }
            </Text>
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
            <Input w="50%" value={newEmail} onChangeText={setNewEmail}/>
          </HStack>
          <HStack alignItems="center" justifyContent="space-between">
            <Text color="white" fontWeight="black" fontSize={16}>
              Telefone:
            </Text>
            <Input w="50%" value={newPhone} onChangeText={setNewPhone}/>
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
