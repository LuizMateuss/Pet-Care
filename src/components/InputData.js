import { Input } from 'native-base'
export function InputData(props) {
  return (
    <Input
      variant="rounded"
      my={4}
      bg="white"
      borderWidth={0}
      _focus={{
        bg: 'white'
      }}
      placeholder={`${props.title}`}
    />
  )
}
