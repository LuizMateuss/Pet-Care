import { useState, useEffect } from 'react'
import {
  Button as ButtonNativeBase,
  HStack,
  Text,
  VStack,
  View,
  useTheme,
  Image
} from 'native-base'

import { Modal } from 'react-native'

import { PawPrint } from 'phosphor-react-native'

import { Button } from '../components/Button'

import { useNavigation } from '@react-navigation/native'

const ModalCancel = ({ visible, children, ...props }) => {
  const [showModal, setShowModal] = useState(props.visible)
  useEffect(() => {
    toggleModal()
  }, [visible])
  const toggleModal = () => {
    visible ? setShowModal(true) : setShowModal(false)
  }
  return (
    <Modal transparent visible={showModal}>
      <View
        flex={1}
        bg="rgba(217,217,217,0.8)"
        justifyContent="center"
        alignItems="center"
      >
        {children}
      </View>
    </Modal>
  )
}
export function StartService({ route }) {
  const { colors } = useTheme()
  const [visible, setVisible] = useState(false)
  const { isCare } = route.params
  const mainColor = isCare ? '#00ABBC' : '#511AC7'
  const navigation = useNavigation()

  function cancelService() {
    isCare
      ? navigation.navigate('startPetCare', { isCare })
      : navigation.navigate('menuHamburguer', { isCare })
    setVisible(false)
  }
  return (
    <VStack bg="white">
      <HStack
        position="absolute"
        zIndex={1}
        w="full"
        bg="white"
        justifyContent="center"
        pt={8}
        pb={4}
        rounded={20}
      >
        <VStack bg={mainColor} w="90%" p={8} rounded={20}>
          <Text color="white" textAlign="center">
            Serviço agendado #1
          </Text>
          <Text color="white" textAlign="center">
            Você pode conversar com o {isCare ? 'tutor' : 'cuidador'} para
            combinar como pegar o pet
          </Text>
        </VStack>
      </HStack>

      <Image
        alt="Localização"
        position="relative"
        zIndex={0}
        w="100%"
        h="50%"
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
        <VStack bg={mainColor} py={5} rounded={20} alignItems="center" w="100%">
          <View p={4} rounded={40} mb={2} bg="white">
            <PawPrint size={25} color={mainColor} />
          </View>
          <Text color="white">Data: 14/06/2022</Text>
          <Text color="white">Hora de início: 20:29</Text>
          <Text color="white">Serviço: Passeio</Text>
          <Text color="white">Cliente: xxx-xxx</Text>
          <Text color="white">Local: xxxxxxx, xx, xxxxx</Text>
        </VStack>
        <ModalCancel visible={visible}>
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
              onPress={() => setVisible(false)}
            />
          </View>
        </ModalCancel>
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
                navigation.navigate('serviceInProgress', { isCare })
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
              onPress={() => navigation.navigate('userProfile', { isCare })}
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
            onPress={() => setVisible(true)}
          />
        </VStack>
      </VStack>
    </VStack>
  )
}
