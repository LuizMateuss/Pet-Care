import { Input } from 'native-base'
export function InputData(props) {
  return (
    <Input
      variant="rounded"
      bg="white"
      my="2%"
      borderWidth={0}
      _focus={{
        bg: 'white'
      }}
      type={props.type}
      placeholder={`${props.title}`}
    />
  )
}
