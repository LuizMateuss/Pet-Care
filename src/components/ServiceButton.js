import { Button as ButtonNativeBase, Text } from 'native-base'

export function ServiceButton(props) {
  return (
    <ButtonNativeBase
      borderWidth={props.borderWidth}
      borderColor={`${props.borderColor}`}
      bg={props.backgroundColor}
      my={props.marginY}
      w={props.width}
      m={props.margin}
      py={props.paddingY}
      px={props.paddingX}
      rounded={40}
      _pressed={{ bg: 'gray.100' }}
      onPress={props.handleFunction}
    >
      <Text
        fontWeight={props.weight}
        fontSize={{
          base: 'md',
          md: 'lg',
          lg: 'xl'
        }}
        color={`${props.color}`}
      >
        {props.title}
      </Text>
    </ButtonNativeBase>
  )
}
