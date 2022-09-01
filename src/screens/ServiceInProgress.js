import { Image, Text, VStack, View, useTheme } from 'native-base'
import { PawPrint } from 'phosphor-react-native'
import { Button } from '../components/Button'
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
              <Button
                title="Chat"
                color={mainColor}
                borderWidth={1}
                borderColor={mainColor}
                onPress={() => navigation.navigate('chat', { isCare })}
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
                <Button
                  title="Chat"
                  borderWidth={1}
                  borderColor="white"
                  width="100%"
                  onPress={() => navigation.navigate('chat', { isCare })}
                />
              </View>
            ) : (
              <></>
            )}
            <View mt={2}>
              <Text textAlign="center" color="white">
                Data: 14/06/2022
              </Text>
              <Text textAlign="center" color="white">
                Hora de início: 20:29
              </Text>
              <Text textAlign="center" color="white">
                Serviço: Passeio
              </Text>
              <Text textAlign="center" color="white">
                Cliente: xxx-xxx
              </Text>
            </View>
          </VStack>
          {isCare ? (
            <VStack mt={4}>
              <Button
                title="Terminar passeio"
                color={colors.red[700]}
                borderWidth={1}
                width="100%"
                borderColor={colors.red[700]}
                onPress={() => navigation.navigate('startPetCare', { isCare })}
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
