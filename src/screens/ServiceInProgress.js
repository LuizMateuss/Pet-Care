import { HStack, Text, VStack, View, useTheme } from 'native-base'
import { Dimensions, Image, StyleSheet, ScrollView } from 'react-native'
import { PawPrint } from 'phosphor-react-native'
import { ServiceButton } from '../components/ServiceButton'
import { SafeAreaView } from 'react-native-safe-area-context'

export function ServiceInProgress() {
  const { colors } = useTheme()
  return (
    <SafeAreaView>
      <VStack pb={12}>
        <Image
          style={styles.ImageMap}
          source={require('../../assets/img/map_image.png')}
        />

        <VStack
          position="relative"
          bottom={10}
          zIndex={1}
          w="full"
          bg="white"
          justifyContent="center"
          py={10}
          px={5}
          rounded={20}
        >
          <VStack
            bg="secondary.700"
            py={5}
            rounded={20}
            alignItems="center"
            w="full"
          >
            <View p={4} rounded={40} bg="white">
              <PawPrint size={25} color="#00ABBC" />
            </View>
            <View w="50%" m={2}>
              <Text style={styles.messagePopup}>1</Text>
              <ServiceButton title="Chat" color={colors.white} />
            </View>
            <Text color="white">Data: 14/06/2022</Text>
            <Text color="white">Hora de início: 20:29</Text>
            <Text color="white">Serviço: Passeio</Text>
            <Text color="white">Cliente: xxx-xxx</Text>
          </VStack>
          <VStack mt={4}>
            <ServiceButton title="Terminar passeio" color={colors.red[700]} />
          </VStack>
        </VStack>
      </VStack>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  ImageMap: {
    position: 'relative',
    zIndex: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.5
  },
  messagePopup: {
    position: 'absolute',
    zIndex: 1,
    padding: 3,
    paddingHorizontal: 10,
    marginLeft: 5,
    top: -5,
    right: 1,
    backgroundColor: '#ffffff',
    borderRadius: 40
  }
})
