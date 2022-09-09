import { Button as ButtonNativeBase, Text } from 'native-base'

export function Button({ title, color = 'white', weight, ...rest }) {
  return (
    <ButtonNativeBase
      bg="transparent"
      my={1}
      w="auto"
      m="auto"
      rounded={40}
      _pressed={{ bg: 'gray.100' }}
      {...rest}
    >
      <Text
        fontWeight={weight}
        fontSize={{
          base: 'md',
          md: 'lg',
          lg: 'xl'
        }}
        color={color}
      >
        {title}
      </Text>
    </ButtonNativeBase>
  )
}
