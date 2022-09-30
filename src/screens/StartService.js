import { useState } from 'react'
import {
  Button as ButtonNativeBase,
  HStack,
  Text,
  VStack,
  View,
  useTheme,
  Image,
  Modal,
  ScrollView
} from 'native-base'

import { Button } from '../components/Button'

import { useNavigation } from '@react-navigation/native'

export function StartService({ route }) {
  const { colors } = useTheme()
  const [showModal, setShowModal] = useState(false)
  const { isCare, user } = route.params
  const mainColor = isCare ? '#00ABBC' : '#511AC7'
  const navigation = useNavigation()

  function cancelService() {
    isCare
      ? navigation.navigate('startPetCare', { isCare, user })
      : navigation.navigate('menuHamburguer', { isCare, user })
    setShowModal(false)
  }
  return (
    <ScrollView bg="white" h="100%">
      <VStack>
        <View
          position="relative"
          top={5}
          p={2}
          zIndex={1}
          w="full"
          bg="white"
          mt={5}
          borderRadius={20}
        >
          <VStack w="60%" mx="auto" bg={mainColor} p={2} borderRadius={20}>
            <Text
              textAlign="center"
              color="white"
              fontWeight="black"
              fontSize={16}
            >
              Serviço agendado #1
            </Text>
            <Text
              textAlign="center"
              color="white"
              fontWeight="black"
              fontSize={16}
            >
              Você pode conversar com o cuidador para combinar como pegar o pet.
            </Text>
          </VStack>
        </View>
        <Image
          alt="Localização"
          position="relative"
          zIndex={0}
          w="100%"
          h={350}
          resizeMode="cover"
          source={require('../../assets/img/map_image_point.png')}
        />

        <VStack
          position="relative"
          bottom={10}
          zIndex={1}
          w="full"
          bg="white"
          justifyContent="center"
          mt="1%"
          py={5}
          px={5}
          rounded={20}
        >
          <VStack
            bg={mainColor}
            py={5}
            rounded={20}
            alignItems="center"
            w="100%"
            mx="auto"
          >
            <Image
              alt="Imagem pet"
              source={require('../../assets/img/PerfilAnimalImagem.png')}
              w={70}
              h={70}
              borderRadius={50}
            />

            <View mt={2} alignItems="center">
              <Text color="white">Animal: Bob</Text>
              <Text color="white">Data: 14/06/2022</Text>
              <Text color="white">Horário de início: xx:xx</Text>
              <Text color="white">Serviço: Passeio</Text>
              <Text color="white">Cuidador: xxx-xxx</Text>
              <Text color="white">Local: xxxxxxxxx, xx, xxxxxx</Text>
            </View>
          </VStack>
          <VStack>
            {isCare ? (
              <Button
                title="Começar serviço"
                color={colors.cyan[700]}
                borderWidth={1}
                borderColor={colors.cyan[700]}
                my={1}
                w="100%"
                onPress={() =>
                  navigation.navigate('serviceInProgress', { isCare, user })
                }
              />
            ) : (
              <Button
                title="Ver perfil do cuidador"
                color={mainColor}
                borderWidth={1}
                borderColor={mainColor}
                my={1}
                w="100%"
                onPress={() =>
                  navigation.navigate('userProfile', { isCare, user })
                }
              />
            )}

            <Button
              title="Chat"
              color={mainColor}
              borderWidth={1}
              borderColor={mainColor}
              my={1}
              w="100%"
              onPress={() => navigation.navigate('chat', { isCare })}
            />
            <Button
              title="Cancelar"
              color={colors.red[700]}
              borderWidth={1}
              borderColor={colors.red[700]}
              my={1}
              w="100%"
              onPress={() => setShowModal(true)}
            />
          </VStack>
        </VStack>

        <Modal isOpen={showModal} onClose={() => setShowModal(!showModal)}>
          <View w="80%" bg="white" p={5}>
            <Text textAlign="center" fontSize={20}>
              Tem certeza que deseja cancelar?
            </Text>
            <Text textAlign="center" fontSize={15} my={5}>
              *Punições poderão ser aplicadas segundo os termos de serviço
            </Text>

            <Button
              title="Sim"
              color={colors.cyan[700]}
              borderWidth={1}
              borderColor={colors.cyan[700]}
              my={1}
              w="100%"
              onPress={cancelService}
            />
            <Button
              title="Cancelar"
              color={colors.red[700]}
              borderWidth={1}
              borderColor={colors.red[700]}
              my={1}
              w="100%"
              onPress={() => setShowModal(false)}
            />
          </View>
        </Modal>
      </VStack>
    </ScrollView>
  )
}
