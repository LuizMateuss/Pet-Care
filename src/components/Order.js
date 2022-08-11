import { HStack, VStack, View, Text, Button } from 'native-base'
import { Image, StyleSheet } from 'react-native'

export function Order(props) {
  return (
    <VStack w="80%" m="auto" my={10}>
      <VStack
        mt={10}
        mb={5}
        bg="white"
        borderWidth={1}
        borderColor="secondary.700"
        p={4}
        rounded={15}
      >
        <VStack alignItems="center">
          <Image
            style={styles.imageUser}
            source={require('../../assets/img/anonymous.png')}
          />
        </VStack>
        <VStack mt={10}>
          <Text
            textAlign="center"
            fontWeight="black"
            fontSize={20}
            color="secondary.700"
          >
            Nome Tutor
          </Text>
        </VStack>
        <HStack justifyContent="space-between" mt={10}>
          <VStack alignItems="center">
            <Text fontWeight="black" fontSize={16} color="secondary.700">
              Espécie
            </Text>
            <Text fontSize={16} color="secondary.700">
              Cachorro
            </Text>
          </VStack>
          <VStack alignItems="center">
            <Text fontWeight="black" fontSize={16} color="secondary.700">
              Serviço
            </Text>
            <Text fontSize={16} color="secondary.700">
              Passeio
            </Text>
          </VStack>
        </HStack>
      </VStack>
      <HStack justifyContent="space-between">
        <Button
          bg="transparent"
          borderWidth={1}
          borderColor="secondary.700"
          rounded={15}
          py={4}
          px={10}
        >
          <Text fontWeight="black" fontSize={16} color="secondary.700">
            Detalhes
          </Text>
        </Button>
        <Button
          bg="transparent"
          borderWidth={1}
          borderColor="red.700"
          rounded={15}
          py={4}
          px={10}
        >
          <Text fontWeight="black" fontSize={16} color="red.700">
            Recusar
          </Text>
        </Button>
      </HStack>
    </VStack>
  )
}

const styles = StyleSheet.create({
  imageUser: {
    borderRadius: 60,
    position: 'absolute',
    height: 100,
    width: 100,
    zIndex: 1,
    bottom: -40
  }
})
