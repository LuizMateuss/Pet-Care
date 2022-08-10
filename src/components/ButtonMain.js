import { Button as ButtonNativeBase, Text, useTheme } from 'native-base'

export function ButtonMain(props) {
  const { colors } = useTheme()
  return (
    <ButtonNativeBase
      borderWidth={1}
      borderColor={
        props.color === 'transparent' ? colors.secondary[700] : `${props.color}`
      }
      bg={`${props.color}`}
      rounded={60}
      w="70%"
      m="auto"
      my={3}
      py={4}
      px={8}
      _pressed={{ opacity: 1 }}
    >
      <Text
        fontWeight="bold"
        textAlign="center"
        fontSize={18}
        color={`${props.colorText}`}
      >
        {props.title}
      </Text>
    </ButtonNativeBase>
  )
}
