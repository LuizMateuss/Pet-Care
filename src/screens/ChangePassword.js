import {
  HStack,
  Input,
  ScrollView,
  Text,
  View,
  VStack,
  Modal
} from 'native-base'
import { CaretLeft } from 'phosphor-react-native'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Button } from '../components/Button'
import { useState } from 'react'
import { Alert } from 'react-native'
import { Header } from '../components/Header'
import LottieView from 'lottie-react-native'

/*
  Tela de alterar senha
  propriedade onPress responsável por chamar uma função
  e ir para próxima página.
*/
export function ChangePassword({ route }) {
  const [showModal, setShowModal] = useState(false)
  const navigation = useNavigation()
  const { isCare, user } = route.params
  const mainColor = isCare ? '#00ABBC' : '#511AC7'

  const [currentPasswd, setCurrentPasswd] = useState('')
  const [newPasswd, setNewPasswd] = useState('')
  const [confirmPasswd, setConfirmPasswd] = useState('')

  function handlePasswd() {
    if (!currentPasswd || !newPasswd || !confirmPasswd) {
      return Alert.alert(
        'Tente novamente',
        'Por favor, informe todos os campos.'
      )
    }
    if (newPasswd != confirmPasswd) {
      return Alert.alert(
        'Tente novamente',
        'Por favor, verifique se a senha repetida é diferente da nova senha.'
      )
    }
    if (newPasswd == currentPasswd) {
      return Alert.alert(
        'Tente novamente',
        'Senha atual é identica à nova senha.'
      )
    }
    // console.log(currentPasswd)
    // console.log(newPasswd)
    // console.log(confirmPasswd)
    updatePasswd()
    setShowModal(true)
  }

  async function updatePasswd() {
    const req = await fetch(
      process.env.SERVER_LINK +
        `changepasswd/${user.id}/${currentPasswd}/${newPasswd}`,
      {
        method: process.env.SERVER_METHOD,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
    console.log('foi')
  }

  function closeModal() {
    setShowModal(false)
    navigation.goBack()
  }

  return (
    <View bg="white" flex={1}>
      <Header title="Alterar senha" color={mainColor} />
      <ScrollView bg="white" h="70%">
        <HStack
          px={3}
          py={10}
          bg={mainColor}
          w="80%"
          mx="auto"
          mt={10}
          borderRadius={20}
          alignItems="center"
          justifyContent="space-between"
        >
          <Text fontSize={18} color="white">
            Senha atual:
          </Text>
          <Input
            onChangeText={setCurrentPasswd}
            type="password"
            variant="rounded"
            w="55%"
            ml={1}
            bg="white"
            _focus={{
              bg: 'white'
            }}
          />
        </HStack>
        <VStack
          px={3}
          py={10}
          bg={mainColor}
          w="80%"
          mx="auto"
          mt="30%"
          borderRadius={20}
        >
          <HStack alignItems="center" justifyContent="space-between" mb={5}>
            <Text fontSize={18} color="white">
              Nova senha:
            </Text>
            <Input
              onChangeText={setNewPasswd}
              type="password"
              variant="rounded"
              w="55%"
              bg="white"
              _focus={{
                bg: 'white'
              }}
            />
          </HStack>
          <HStack alignItems="center" justifyContent="space-between">
            <Text fontSize={18} color="white">
              Repita a senha:
            </Text>
            <Input
              onChangeText={setConfirmPasswd}
              type="password"
              variant="rounded"
              w="55%"
              ml={1}
              bg="white"
              _focus={{
                bg: 'white'
              }}
            />
          </HStack>
        </VStack>
        <Text textAlign="center" mt={2} w="80%" m="auto">
          Lembre-se: a senha precisa possuir mais de 8 caracteres incluindo
          letras e números
        </Text>
        <View mt="10%">
          <Button
            title="Salvar alterações"
            color={mainColor}
            borderWidth={1}
            borderColor={mainColor}
            width="80%"
            py={4}
            onPress={handlePasswd}
            // onPress={() => navigation.goBack()}
          />
        </View>
      </ScrollView>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content
          bg="primary.700"
          w="80%"
          p={4}
          borderRadius={20}
          alignItems="center"
        >
          <LottieView
            source={require('../../assets/img/success.json')}
            autoPlay={true}
            style={{
              width: 200,
              height: 200
            }}
            resizeMode="cover"
            loop={false}
          />
          <Text
            color="white"
            textAlign="center"
            fontSize={18}
            fontWeight="black"
            my={2}
          >
            Senha alterada com sucesso!
          </Text>
          <Button
            mt={4}
            title="Voltar para o perfil!"
            w="100%"
            color="white"
            borderWidth={1}
            borderColor="white"
            onPress={closeModal}
          />
        </Modal.Content>
      </Modal>
    </View>
  )
}
