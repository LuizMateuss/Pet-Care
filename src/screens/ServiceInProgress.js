import { Image, Text, VStack, View, useTheme } from 'native-base'
import { PawPrint } from 'phosphor-react-native'
import { Button } from '../components/Button'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

export function ServiceInProgress({ route }) {
  const { isCare, user } = route.params
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
                onPress={() => navigation.navigate('chat', { isCare, user })}
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
            <Image
              alt="Imagem pet"
              source={require('../../assets/img/PerfilAnimalImagem.png')}
              w={70}
              h={70}
              borderRadius={50}
            />

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
                  onPress={() => navigation.navigate('chat', { isCare, user })}
                />
              </View>
            ) : (
              <></>
            )}
            <View mt={2} alignItems="center">
              <Text color="white">Animal: Bob</Text>
              <Text color="white">Horário de início: 20:29</Text>
              <Text color="white">Tempo decorrente: xx:xx</Text>
              <Text color="white">Cliente: xxx-xxx</Text>
              <Text color="white">Valor do serviço: R$29,75</Text>
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
                onPress={() =>
                  navigation.navigate('startPetCare', { isCare, user })
                }
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
