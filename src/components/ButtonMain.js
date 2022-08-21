import { Button as ButtonNativeBase, Text, useTheme } from 'native-base'

export function ButtonMain(props) {
  const { colors } = useTheme()
  return (
    <ButtonNativeBase
      borderWidth={1}
      borderColor={
        props.color === 'transparent'
          ? props.colorText === colors.primary[700]
            ? colors.primary[700]
            : colors.secondary[700]
          : `${props.color}`
      }
      bg={`${props.color}`}
      rounded={60}
      w="80%"
      m="auto"
      my={3}
      py={4}
      px={8}
      _pressed={{ opacity: 1 }}
      onPress={props.nextPage}
    >
      <Text
        fontWeight="bold"
        textAlign="center"
        fontSize={{
          base: 'sm',
          md: 'md',
          lg: 'xl'
        }}
        color={`${props.colorText}`}
      >
        {props.title}
      </Text>
    </ButtonNativeBase>
  )
}
