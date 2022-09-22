import { VStack, Text, Image, HStack } from 'native-base'
import { TouchableOpacity } from 'react-native'
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
    </VStack>
  )
}
