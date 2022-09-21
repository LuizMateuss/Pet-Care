import { HStack, Input, ScrollView, Text, View, VStack } from 'native-base'
import { CaretLeft } from 'phosphor-react-native'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Button } from '../components/Button'
import { useState } from 'react'
import { Alert } from 'react-native'

/*
  Tela de alterar senha
  propriedade onPress responsável por chamar uma função
  e ir para próxima página.
*/
export function ChangePassword({ route }) {
  const navigation = useNavigation()
  const { isCare, userId } = route.params
  const mainColor = isCare ? '#00ABBC' : '#511AC7'

  const [currentPasswd, setCurrentPasswd] = useState('')

  function handlePasswd() {
    if (!currentPasswd/* || !newPasswd || !confirmPasswd*/) {
      return Alert.alert(
        'Tente novamente',
        'Por favor, informe todos os campos.'
      )
    }
    console.log(currentPasswd)
    console.log(userId)
    // setIsLoading(true)
    // setTimeout(verifyUser, 2000)
  }

  return (
    <View bg="white" flex={1} mt={8}>
      <ScrollView bg="white">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <CaretLeft size={26} color={mainColor} />
        </TouchableOpacity>

        <HStack
          px={3}
          py={10}
          bg={mainColor}
          w="80%"
          mx="auto"
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
        <View mt="30%">
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
    </View>
  )
}
