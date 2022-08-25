import { Image, Text, VStack, View, useTheme } from 'native-base'
import { PawPrint } from 'phosphor-react-native'
import { ServiceButton } from '../components/ServiceButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

export function ServiceInProgress({ route }) {
  const { isCare } = route.params
  const mainColor = isCare ? '#00ABBC' : '#511AC7'
  const { colors } = useTheme()
  const navigation = useNavigation()
  return (
    <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
      <VStack bg="white">
        <Image
          position="relative"
          zIndex={0}
          w="100%"
          h={isCare ? '50%' : '60%'}
          alt="Imagem do mapa"
          source={
            isCare
              ? require('../../assets/img/map_image.png')
              : require('../../assets/img/progressServiceMap.png')
          }
        />

        <VStack
          position="relative"
          bottom={10}
          zIndex={1}
          w="full"
          bg="white"
          justifyContent="center"
          py={5}
          px={5}
          rounded={20}
        >
          {isCare ? (
            <></>
          ) : (
            <View mb={4}>
              <ServiceButton
                title="Chat"
                color="primary.700"
                nextPage={() => navigation.navigate('chat', { isCare })}
              />
            </View>
          )}
          <VStack
            bg={mainColor}
            py={5}
            rounded={20}
            alignItems="center"
            w="full"
          >
            <View p={4} rounded={40} bg="white">
              <PawPrint size={25} color={mainColor} />
            </View>
            {isCare ? (
              <View w="50%" m={2}>
                <Text
                  position="absolute"
                  zIndex={1}
                  p={1}
                  px={3}
                  ml={5}
                  top={-5}
                  right={1}
                  bg="#FFF"
                  borderRadius={40}
                >
                  1
                </Text>
                <ServiceButton
                  title="Chat"
                  color="white"
                  nextPage={() => navigation.navigate('chat', { isCare })}
                />
              </View>
            ) : (
              <></>
            )}
            <View mt={2}>
              <Text color="white">Data: 14/06/2022</Text>
              <Text color="white">Hora de início: 20:29</Text>
              <Text color="white">Serviço: Passeio</Text>
              <Text color="white">Cliente: xxx-xxx</Text>
            </View>
          </VStack>
          {isCare ? (
            <VStack mt={4}>
              <ServiceButton
                title="Terminar passeio"
                color={colors.red[700]}
                nextPage={() => navigation.navigate('startPetCare', { isCare })}
              />
            </VStack>
          ) : (
            <></>
          )}
        </VStack>
      </VStack>
    </SafeAreaView>
  )
}
