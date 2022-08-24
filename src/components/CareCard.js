import { HStack, View, Text, Image, Button } from 'native-base'
import { List } from 'phosphor-react-native'
import { TouchableOpacity } from 'react-native'
import { RatingBar } from './RatingStar'

export function CareCard(props) {
  return (
    <HStack
      p={4}
      borderColor="primary.700"
      borderWidth={1}
      borderRadius={20}
      w="90%"
      mx="auto"
      my={2}
      alignItems="center"
      justifyContent="space-between"
    >
      <HStack alignItems="center">
        <Image
          borderRadius={50}
          alt="Imagem cuidador"
          source={require('../../assets/img/anonymous.png')}
        />
        <View ml={2} w="65%">
          <Text textAlign="left" fontSize={16}>
            Nome usuário
          </Text>
          <RatingBar />
        </View>
      </HStack>
      <TouchableOpacity>
        <Button
          borderRadius={100}
          bg="primary.700"
          p={3}
          onPress={props.nextPage}
        >
          <List size={24} color="#FFF" />
        </Button>
      </TouchableOpacity>
    </HStack>
  )
}
