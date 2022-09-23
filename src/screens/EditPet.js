import { VStack, Text, Image, HStack } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { Button } from '../components/Button'
import { Header } from '../components/Header'
import { Input } from '../components/Input'

export function EditPet({ route }) {
  const { isCare } = route.params
  return (
    <VStack>
      <Header title="Editar animal" color="#511AC7" />

      <Image
        alt="Imagem pet"
        source={require('../../assets/img/PerfilAnimalImagem.png')}
        mx="auto"
        mt={4}
      />
      <TouchableOpacity>
        <Text
          fontWeight="black"
          textAlign="center"
          fontSize={16}
          color="#511AC7"
        >
          Alterar imagem
        </Text>
      </TouchableOpacity>
      <Text fontWeight="black" textAlign="center" fontSize={18} color="#511AC7">
        Bob
      </Text>
      <HStack
        alignItems="center"
        justifyContent="space-between"
        w="80%"
        mx="auto"
      >
        <Text fontWeight="black" fontSize={16} color="#511AC7">
          Alterar nome:
        </Text>
        <Input w="60%" borderWidth={1} borderColor="#511AC7" />
      </HStack>
      <VStack bg="primary.700" p={4} borderRadius={10} w="95%" mx="auto" mt={4}>
        <Text fontWeight="black" textAlign="center" fontSize={16} color="white">
          Alterar informações do animal:
        </Text>
        <HStack alignItems="center" justifyContent="space-between">
          <Text fontWeight="black" fontSize={16} color="white">
            Peso aproximado:
          </Text>
          <Input placeholder="kg" w="40%" />
        </HStack>
        <VStack>
          <Text
            fontWeight="black"
            textAlign="center"
            fontSize={16}
            color="white"
          >
            Descrição do animal (opcional):
          </Text>
          <Input />
        </VStack>
      </VStack>
      <Button
        mt={10}
        title="Excluir animal"
        w="80%"
        color="red.700"
        borderWidth={1}
        borderColor="red.700"
      />
      <Button
        mt={4}
        title="Salvar alterações"
        w="80%"
        color="primary.700"
        borderWidth={1}
        borderColor="primary.700"
      />
    </VStack>
  )
}
