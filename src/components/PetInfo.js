import { HStack, VStack, Image, View, Text } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { Pencil, Image as ImageIcon, PawPrint } from 'phosphor-react-native'

export function PetInfo(props) {
  return (
    <View mt={10}>
      <VStack alignItems="center" mx="auto" mb={2}>
        <Image
          h={100}
          w={100}
          borderRadius={50}
          alt="Imagem do animal"
          source={require('../../assets/img/PerfilAnimalImagem.png')}
        />

        <Text fontWeight="black" fontSize={24} color="primary.700">
          {props.petName}
        </Text>
        <TouchableOpacity>
          <HStack mb={2}>
            <Pencil size={20} color="#511AC7" />
            <Text ml={2} fontWeight="medium" fontSize={14} color="primary.700">
              Editar perfil
            </Text>
          </HStack>
        </TouchableOpacity>
        <TouchableOpacity>
          <HStack mb={2}>
            <ImageIcon size={20} color="#511AC7" />
            <Text ml={2} fontWeight="medium" fontSize={14} color="primary.700">
              Escolher imagem
            </Text>
          </HStack>
        </TouchableOpacity>
      </VStack>

      <VStack m="auto" p={5} bg="#511AC7" w="90%" borderRadius={15}>
        <VStack alignItems="center">
          <PawPrint size={24} color="#FFF" />
          <Text mt={1} mb={4} fontWeight="black" fontSize={18} color="white">
            Informações de {props.petName}
          </Text>
        </VStack>
        <HStack justifyContent="space-between">
          <VStack>
            <Text fontWeight="black" fontSize={14} color="white">
              Peso
            </Text>
            <Text fontWeight="black" fontSize={14} color="white">
              Idade
            </Text>
            <Text fontWeight="black" fontSize={14} color="white">
              Raça
            </Text>
            <Text fontWeight="black" fontSize={14} color="white">
              Genêro
            </Text>
          </VStack>
          <VStack>
            <Text fontWeight="black" fontSize={14} color="white">
              {props.petWeight} kg
            </Text>
            <Text fontWeight="black" fontSize={14} color="white">
              {props.petAge} anos
            </Text>
            <Text fontWeight="black" fontSize={14} color="white">
              {props.petRace}
            </Text>
            <Text fontWeight="black" fontSize={14} color="white">
              {props.petGender}
            </Text>
          </VStack>
        </HStack>
      </VStack>
    </View>
  )
}
