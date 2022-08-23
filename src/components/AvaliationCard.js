import { HStack, VStack, Text, Image, View } from 'native-base'
import { RatingBar } from './ratingStar'

export function AvaliationCard(props) {
  return (
    <VStack mx="auto" my={4} w="90%" bg="secondary.700" p={4} borderRadius={20}>
      <HStack alignItems="center">
        <Image
          w={50}
          h={50}
          alt="Foto do tutor"
          source={require('../../assets/img/anonymous.png')}
          borderRadius={25}
        />
        <View ml={3}>
          <Text
            textAlign="center"
            fontWeight="black"
            fontSize={16}
            color="white"
          >
            Nome do tutor
          </Text>
          <RatingBar />
        </View>
      </HStack>
      <Text fontSize={14} color="white">
        {props.avaliationDescription}
      </Text>
    </VStack>
  )
}
