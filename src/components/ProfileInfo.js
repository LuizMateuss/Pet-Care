import { VStack, Text } from 'native-base'

export function ProfileInfo(props) {
  return (
    <VStack
      m="auto"
      p={5}
      my={3}
      bg={props.backgroundInfo}
      w="80%"
      alignItems="center"
      borderRadius={15}
    >
      {props.icon}
      <Text mt={1} mb={4} fontWeight="black" fontSize={18} color="white">
        {props.title}
      </Text>
      <Text fontWeight="black" fontSize={16} color="white">
        {props.info}
      </Text>
    </VStack>
  )
}
