import { HStack, Input, ScrollView, Text, View, VStack } from 'native-base'
import { CaretLeft } from 'phosphor-react-native'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ButtonMain } from '../components/ButtonMain'

export function ChangePassword({ route }) {
  const navigation = useNavigation()
  const { isCare } = route.params
  const mainColor = isCare ? '#00ABBC' : '#511AC7'
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
          my="30%"
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
        <ButtonMain
          color="transparent"
          colorText={mainColor}
          title="Salvar alterações"
          nextPage={() => navigation.goBack()}
        />
      </ScrollView>
    </View>
  )
}
