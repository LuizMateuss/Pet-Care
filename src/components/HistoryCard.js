import { HStack, VStack, View, Text, Button, Image } from 'native-base'
import { StyleSheet } from 'react-native'

export function HistoryCard(props) {
  return (
    <VStack
      borderWidth={1}
      borderColor="secondary.700"
      borderRadius={40}
      w="90%"
      mx="auto"
      my={5}
    >
      <VStack borderTopRadius={40} alignItems="center" bg="secondary.700" p={4}>
        <Image
          alt="Image tutor"
          style={styles.imageUser}
          source={props.image}
        />
        <Text fontWeight="black" fontSize={20} color="white">
          {props.name}
        </Text>
      </VStack>
      <View m="auto" style={styles.shape}>
        <View style={styles.shapeBg}></View>
      </View>
      <VStack p={4}>
        <Text
          textAlign="center"
          fontWeight="black"
          fontSize={18}
          color="secondary.700"
        >
          Detalhes do serviço
        </Text>
        <HStack justifyContent="space-between" mx={4}>
          <VStack>
            <Text fontWeight="black" fontSize={14} color="secondary.700">
              Tipo
            </Text>
            <Text fontWeight="black" fontSize={14} color="secondary.700">
              Data
            </Text>
            <Text fontWeight="black" fontSize={14} color="secondary.700">
              Valor
            </Text>
          </VStack>
          <VStack>
            <Text fontWeight="black" fontSize={14} color="secondary.700">
              {props.typeService}
            </Text>
            <Text fontWeight="black" fontSize={14} color="secondary.700">
              {props.dateService}
            </Text>
            <Text fontWeight="black" fontSize={14} color="secondary.700">
              R${props.valueService}
            </Text>
          </VStack>
        </HStack>
      </VStack>
      <HStack
        p={2}
        justifyContent="space-between"
        bg="secondary.700"
        borderBottomRadius={40}
      >
        <Button bg="transparent" ml={6}>
          <Text fontWeight="black" fontSize={16} color="white">
            {props.isCare ? 'Perfil do tutor' : 'Perfil do cuidador'}
          </Text>
        </Button>
        <Button bg="transparent" mr={6}>
          <Text fontWeight="black" fontSize={16} color="white">
            Avaliar
          </Text>
        </Button>
      </HStack>
    </VStack>
  )
}

const styles = StyleSheet.create({
  imageUser: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  shape: {
    overflow: 'hidden',
    height: 25,

    borderBottomEndRadius: 50,
    borderBottomLeftRadius: 50,

    backgroundColor: 'transparent',
    transform: [{ scaleX: 7 }]
  },
  shapeBg: {
    backgroundColor: '#00ABBC',
    width: 50,
    height: 50,
    transform: [{ scaleX: 7 }]
  }
})
