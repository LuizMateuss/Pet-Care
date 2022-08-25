import { Text, View, Image, HStack } from 'native-base'

export function Message(props) {
  const mainColor = props.isCare ? '#00ABBC' : '#511AC7'
  return (
    <HStack mt={10} justifyContent="center">
      {props.reply ? (
        <>
          <Image
            alt="Foto usuário"
            borderRadius={50}
            source={require('../../assets/img/anonymous.png')}
          />

          <View
            bg={mainColor}
            p={4}
            w="70%"
            ml={4}
            borderTopRightRadius={20}
            borderBottomLeftRadius={20}
            borderBottomRightRadius={20}
          >
            <Text style={{ color: '#ffffff' }}>{props.message}</Text>
          </View>
        </>
      ) : (
        <>
          <View
            bg={mainColor}
            p={4}
            w="70%"
            mr={4}
            borderBottomLeftRadius={20}
            borderBottomRightRadius={20}
            borderTopLeftRadius={20}
          >
            <Text style={{ color: '#ffffff' }}>{props.message}</Text>
          </View>

          <Image
            alt="Foto usuário"
            borderRadius={50}
            source={require('../../assets/img/anonymous.png')}
          />
        </>
      )}
    </HStack>
  )
}
