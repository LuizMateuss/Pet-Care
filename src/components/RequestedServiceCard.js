import { HStack, VStack, Text, Button, Image } from 'native-base'
import { useNavigation } from '@react-navigation/native'
export function RequestedServiceCard(props) {
  const navigation = useNavigation()
  const { isCare } = props
  const mainColor = isCare ? '#00ABBC' : '#511AC7'
  return (
    <VStack
      borderWidth={1}
      borderColor={mainColor}
      borderRadius={40}
      w="90%"
      mx="auto"
      my={5}
    >
      <VStack borderTopRadius={40} alignItems="center" bg={mainColor} p={4}>
        <Image
          alt="Imagem usuário"
          w={100}
          h={100}
          borderRadius={50}
          source={props.image}
        />
        <Text fontWeight="black" fontSize={20} color="white">
          {props.name}
        </Text>
        <Text fontWeight="black" fontSize={20} color="white">
          Serviço agendado #1
        </Text>
      </VStack>
      <VStack p={4}>
        <Text
          textAlign="center"
          fontWeight="black"
          fontSize={18}
          color={mainColor}
        >
          Detalhes do serviço
        </Text>
        <HStack justifyContent="space-between" mx={4}>
          <VStack>
            <Text fontWeight="black" fontSize={14} color={mainColor}>
              Tipo
            </Text>
            <Text fontWeight="black" fontSize={14} color={mainColor}>
              Data
            </Text>
            <Text fontWeight="black" fontSize={14} color={mainColor}>
              Valor
            </Text>
          </VStack>
          <VStack>
            <Text fontWeight="black" fontSize={14} color={mainColor}>
              {props.typeService}
            </Text>
            <Text fontWeight="black" fontSize={14} color={mainColor}>
              {props.dateService}
            </Text>
            <Text fontWeight="black" fontSize={14} color={mainColor}>
              R${props.valueService}
            </Text>
          </VStack>
        </HStack>
      </VStack>
      <HStack
        p={2}
        bg={mainColor}
        borderBottomRadius={40}
        justifyContent="center"
      >
        <Button
          bg="transparent"
          _pressed={{ bg: 'transparent' }}
          onPress={() => navigation.navigate('startService', { isCare })}
        >
          <Text
            fontWeight="black"
            textAlign="center"
            fontSize={16}
            color="white"
          >
            Ver mais detalhes do serviço
          </Text>
        </Button>
      </HStack>
    </VStack>
  )
}
