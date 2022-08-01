import { Button as ButtonNativeBase, IButtonProps, Text} from 'native-base'

type Props = IButtonProps & {
  title: string;
  color: string;
}

export function ServiceButton({title, ...props}: Props) {
  return (
    <ButtonNativeBase borderWidth={1} borderColor={`${props.color}`} bg="transparent" my={1} rounded={20} _pressed={{ bg: "gray.100" }} >
      <Text color={`${props.color}`}>{title}</Text>
    </ButtonNativeBase>
  )
}