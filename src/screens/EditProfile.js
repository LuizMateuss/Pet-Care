import { VStack, Text, HStack, Image, ScrollView } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { Button } from '../components/Button'
import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { useNavigation } from '@react-navigation/native'

export function EditProfile({ route }) {
  const navigation = useNavigation()
  const { isCare, user } = route.params
  const mainColor = isCare ? '#00ABBC' : '#511AC7'

  return (
    <VStack>
      <Header title="Editar perfil" color={mainColor} />

      <ScrollView h="85%">
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
            <Input borderWidth={1} borderColor={mainColor} />
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
              <Input />
            </VStack>
            <VStack w="40%">
              <Text color="white" fontWeight="black" fontSize={16}>
                Número:
              </Text>
              <Input />
            </VStack>
          </HStack>
          <HStack alignItems="center" justifyContent="space-between">
            <Text color="white" fontWeight="black" fontSize={16}>
              Complemento:
            </Text>
            <Input w="50%" />
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
              Rua Aletória Demais, Nº 688 - Ap. 11. CEP: 11545-122, Santos/SP.
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
            <Input w="50%" />
          </HStack>
          <HStack alignItems="center" justifyContent="space-between">
            <Text color="white" fontWeight="black" fontSize={16}>
              Telefone:
            </Text>
            <Input w="50%" />
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
          onPress={() => navigation.navigate('profileCare', { isCare, user })}
        />
      </ScrollView>
    </VStack>
  )
}
