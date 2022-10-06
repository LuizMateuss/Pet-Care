import { LinearGradient } from 'expo-linear-gradient'
import {
  HStack,
  VStack,
  Image,
  Text,
  View,
  Checkbox,
  ScrollView
} from 'native-base'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { Alert } from 'react-native'

/*
  Tela de criação de conta.
  -> Componente InputData recebe:
    -> title (string), o que vai ficar como placeholder.
    -> type (string), o tipo da nossa input (password e etc...).
  -> Componente CheckBox:
    -> Recebe cores, label 
  -> propriedade nextPage é responsável por nos levar até a próxima página.
*/
export function CreateAccount({ route }) {
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [dateBirth, setDateBirth] = useState('')
  const [cpf, setCpf] = useState('')
  const [check, setCheck] = useState(false)
  const navigation = useNavigation()
  const { isCare } = route.params
  let configEmail

  function handleSignUp() {
    if (!email || !password || !confirmPassword || !phone || !dateBirth) {
      return Alert.alert(
        'Tente novamente',
        'Por favor, informe todos os campos.'
      )
    } else if (password != confirmPassword) {
      return Alert.alert('Tente novamente', 'As senhas não conferem.')
    }
    setIsLoading(true)
    setTimeout(validationInput, 2000)
  }

  function validationInput() {
    configEmail = email.toLowerCase().trim()
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/
    const regexDate =
      /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
    setIsLoading(false)
    validationRegex(reg, regexDate)
  }

  function validationRegex(reg, regexDate, regexCpf) {
    if (reg.test(configEmail) == false) {
      return Alert.alert('E-mail inválido', 'Insira um e-mail válido!')
    } else {
      if (regexDate.test(dateBirth) == false) {
        return Alert.alert('Data inválida', 'Insira uma data válida!')
      } else {
        if (check) {
          registerUser()
        } else {
          return Alert.alert(
            'Termos e condições',
            'Por favor, aceite os termos e condições.'
          )
        }
      }
    }
  }

  async function registerUser() {
    const req = await fetch(
      process.env.SERVER_LINK + `/verifyRegistration/${configEmail}`,
      {
        method: process.env.SERVER_METHOD,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    ).catch(() => {
      setIsLoading(false)
      Alert.alert(
        'Desulpe!',
        'Estamos enfrentando problemas de conexão, por favor tente novamente mais tarde.'
      )
    })

    if (res) {
      let sendIsCare
      if (isCare) sendIsCare = 'C'
      else sendIsCare = 'T'
      let birthday = dateBirth.split('/')
      birthday = `${birthday[2]}-${birthday[1]}-${birthday[0]}`
      const user = {
        name: name,
        email: configEmail,
        password: password,
        birthday: birthday,
        phone: phone,
        isCare: sendIsCare
      }
      verifyIsCareAndNextPage(user)
    } else {
      Alert.alert('Email já Cadastrado', 'Por favor, informe outro email')
    }
  }

  function verifyIsCareAndNextPage(user) {
    if (isCare) {
      navigation.navigate('registerAddress', {
        isCare,
        user
      })
    } else {
      navigation.navigate('registerAddress', { isCare, user })
    }
  }

  return (
    <View flex={1}>
      <ScrollView keyboardShouldPersistTaps="always">
        <LinearGradient
          colors={isCare ? ['#00abbc52', '#00abbc'] : ['#511AC752', '#511AC7']}
          style={{ paddingBottom: 50, flex: 1, flexDirection: 'column' }}
        >
          <VStack>
            <View alignItems="center">
              <Image
                position="absolute"
                zIndex={1}
                top={10}
                alt="Logo pet care"
                source={
                  isCare
                    ? require('../../assets/img/petCareGreenLogo.png')
                    : require('../../assets/img/petCarePurpleLogo.png')
                }
              />
              <Image
                w="100%"
                h={250}
                alt="Fundo branco"
                source={require('../../assets/img/whiteVector.png')}
              />
            </View>
            <VStack w="80%" mx="auto" mt={2}>
              <Input placeholder="Nome Usuário:" onChangeText={setName} />
              <Input placeholder="E-mail:" onChangeText={setEmail} />
              <Input
                placeholder="Senha:"
                type="password"
                onChangeText={setPassword}
              />
              <Input
                placeholder="Repetir Senha:"
                type="password"
                onChangeText={setConfirmPassword}
              />
              <Input placeholder="Telefone:" onChangeText={setPhone} />
              <Input
                placeholder="Data de Nascimento:"
                onChangeText={setDateBirth}
              />
              <Input placeholder="CPF:" onChangeText={setCpf} />
              <HStack alignItems="center" mx="auto" mb="2%" color="white">
                <Checkbox
                  accessibilityLabel="termos"
                  onChange={() => (check ? setCheck(false) : setCheck(true))}
                  rounded={50}
                  colorScheme="green"
                  borderColor="white"
                  bg="transparent"
                ></Checkbox>
                <Text ml={5} color="white">
                  concordo com os termos de serviço e a política de privacidade
                </Text>
              </HStack>
              <Button
                title="Cadastrar"
                color="white"
                my={1}
                w="100%"
                backgroundColor="transparent"
                borderColor="white"
                borderWidth={1}
                onPress={handleSignUp}
                isLoading={isLoading}
              />
              <View borderBottomWidth={1} my="2%" borderColor="white" />
              <Button
                title="Login"
                color="white"
                backgroundColor="transparent"
                borderColor="white"
                borderWidth={1}
                marginY={1}
                width="100%"
                onPress={() => navigation.navigate('signIn')}
              />
            </VStack>
          </VStack>
        </LinearGradient>
      </ScrollView>
    </View>
  )
}
