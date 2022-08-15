import {
  HStack,
  VStack,
  View,
  Text,
  ScrollView,
  Image,
  Button
} from 'native-base'
import { MapPin } from 'phosphor-react-native'
import { ServiceButton } from '../components/ServiceButton'

export function OrderInfo() {
  return (
    <VStack mt={8}>
      <ScrollView>
        <Text
          textAlign="center"
          fontSize={35}
          fontWeight="black"
          color="secondary.700"
        >
          Solicitação #1
        </Text>
        <VStack w="90%" p={4} mx="auto" bg="secondary.700" mb={10} rounded={40}>
          <HStack alignItems="center">
            <Image
              alt="Imagem do tutor"
              source={require('../../assets/img/anonymous.png')}
              w={100}
              h={100}
              borderRadius={50}
            />
            <VStack ml={5}>
              <Text fontSize={20} fontWeight="black" color="white">
                Nome do tutor
              </Text>
              <HStack>
                <MapPin size={24} color="#FFFFFF" />
                <Text ml={5} fontSize={14} color="white">
                  Santos, SP
                </Text>
              </HStack>
            </VStack>
          </HStack>

          <VStack mt={10} alignItems="center">
            <Text fontSize={35} fontWeight="black" color="white">
              SERVIÇO
            </Text>
            <Text fontSize={16} color="white">
              Solicitação para: 01/06 - 14h
            </Text>
          </VStack>
          <VStack mt={20}>
            <Text
              textAlign="center"
              fontSize={20}
              fontWeight="black"
              color="white"
            >
              Detalhes do animal
            </Text>
            <HStack mx="auto" w="50%" justifyContent="space-between">
              <VStack>
                <Text fontSize={18} color="white">
                  Peso
                </Text>
                <Text fontSize={18} color="white">
                  Idade
                </Text>
                <Text fontSize={18} color="white">
                  Raça
                </Text>
                <Text fontSize={18} color="white">
                  Gênero
                </Text>
              </VStack>
              <VStack>
                <Text fontSize={18} color="white">
                  7kg
                </Text>
                <Text fontSize={18} color="white">
                  2 anos
                </Text>
                <Text fontSize={18} color="white">
                  Pitbull
                </Text>
                <Text fontSize={18} color="white">
                  Feminino
                </Text>
              </VStack>
            </HStack>
          </VStack>
          <VStack mt={10}>
            <HStack mb={20} justifyContent="space-between">
              <Button
                borderWidth={1}
                borderColor="white"
                bg="transparent"
                rounded={20}
                w="40%"
                mr={5}
                _pressed={{ bg: 'gray.100' }}
              >
                <Text color="white">Aceitar</Text>
              </Button>
              <Button
                borderWidth={1}
                borderColor="white"
                bg="transparent"
                rounded={20}
                w="40%"
                ml={5}
                _pressed={{ bg: 'gray.100' }}
              >
                <Text color="white">Recusar</Text>
              </Button>
            </HStack>
            <ServiceButton color="white" title="Voltar" />
          </VStack>
        </VStack>
      </ScrollView>
    </VStack>
  )
}
