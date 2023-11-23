import { Input as InputNativeBase } from 'native-base'
export function Input({ ...rest }) {
  return (
    <InputNativeBase
      variant="rounded"
      bg="white"
      my="2%"
      borderWidth={0}
      _focus={{
        bg: 'white'
      }}
      {...rest}
    />
  )
}
