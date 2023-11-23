import { HStack, Text } from 'native-base'
import { CaretLeft } from 'phosphor-react-native'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export function Header(props) {
  const navigation = useNavigation()

  return (
    <HStack
      bg={`${props.color}`}
      justifyContent="space-between"
      alignItems="center"
      mt={8}
      p={4}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <CaretLeft size={20} color="#FFFFFF" />
      </TouchableOpacity>
      <Text
        flex={1}
        color="#FFFFFF"
        textAlign="center"
        fontSize={20}
        fontWeight="bold"
      >
        {props.title}
      </Text>
    </HStack>
  )
}
