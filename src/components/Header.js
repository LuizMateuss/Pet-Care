import { HStack, Text } from 'native-base'
import { CaretLeft } from 'phosphor-react-native'

export function Header(props) {
  return (
    <HStack
      bg="secondary.700"
      justifyContent="space-between"
      alignItems="center"
      mt={8}
      p={4}
    >
      <CaretLeft size={24} color="#FFFFFF" />
      <Text
        flex={1}
        color="#FFFFFF"
        textAlign="center"
        fontSize={24}
        fontWeight="bold"
      >
        {props.title}
      </Text>
    </HStack>
  )
}
