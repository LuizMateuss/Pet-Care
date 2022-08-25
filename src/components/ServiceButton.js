import { Button as ButtonNativeBase, Text } from 'native-base'

export function ServiceButton(props) {
  return (
    <ButtonNativeBase
      borderWidth={1}
      borderColor={`${props.color}`}
      bg="transparent"
      my={1}
      rounded={20}
      _pressed={{ bg: 'gray.100' }}
      onPress={props.nextPage}
    >
      <Text color={`${props.color}`}>{props.title}</Text>
    </ButtonNativeBase>
  )
}
