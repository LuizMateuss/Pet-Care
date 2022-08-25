import { View, Input, HStack } from 'native-base'

import { PaperPlaneRight, Camera } from 'phosphor-react-native'

export function InputMessage(props) {
  const mainColor = props.isCare ? '#00ABBC' : '#511AC7'
  return (
    <HStack alignItems="center" justifyContent="center" py={4} m="auto">
      <View w="70%">
        <View
          bg={mainColor}
          borderWidth={1}
          borderColor={mainColor}
          borderRadius={50}
          p={3}
          position="absolute"
        >
          <Camera size={28} color="#ffffff" />
        </View>
        <Input
          bg="transparent"
          p={3}
          borderRadius={50}
          borderColor={mainColor}
          borderWidth={1}
          pl={20}
          placeholder="Envie sua mensagem..."
        />
      </View>
      <View bg={mainColor} borderRadius={50} p={3} ml={2}>
        <PaperPlaneRight size={28} color="#fff" />
      </View>
    </HStack>
  )
}
