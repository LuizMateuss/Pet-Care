import { HStack, Text } from 'native-base'
import { CaretLeft } from 'phosphor-react-native'

export function Header(props) {
  return (
    <HStack
      bg={`${props.color}`}
      justifyContent="space-between"
      alignItems="center"
      mt={8}
      p={4}
    >
      <CaretLeft size={20} color="#FFFFFF" />
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
