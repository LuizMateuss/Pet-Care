import { useState, useEffect } from 'react'
import {
  Button as ButtonNativeBase,
  HStack,
  Text,
  VStack,
  View,
  useTheme,
  ScrollView
} from 'native-base'

import { Dimensions, Image, StyleSheet, Modal } from 'react-native'

import { PawPrint } from 'phosphor-react-native'

import { ServiceButton } from '../components/ServiceButton'

import { useNavigation } from '@react-navigation/native'

const ModalCancel = ({ visible, children, ...props }) => {
  const { colors } = useTheme()
  const [showModal, setShowModal] = useState(props.visible)
  useEffect(() => {
    toggleModal()
  }, [visible])
  const toggleModal = () => {
    visible ? setShowModal(true) : setShowModal(false)
  }
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalContainer}>{children}</View>
    </Modal>
  )
}

export function StartService() {
  const { colors } = useTheme()
  const [visible, setVisible] = useState(false)
  const navigation = useNavigation()

  function cancelService() {
    navigation.navigate('startPetCare')
    setVisible(false)
  }
  return (
    <VStack pb={12}>
      <HStack
        position="absolute"
        zIndex={1}
        w="full"
        bg="white"
        justifyContent="center"
        pt={8}
        pb={8}
        rounded={20}
      >
        <Text bg="secondary.700" p={8} rounded={20} color="white">
          Localização do Serviço
        </Text>
      </HStack>

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
          w="100%"
        >
          <View p={4} rounded={40} bg="white">
            <PawPrint size={25} color="#00ABBC" />
          </View>
          <Text color="white">Data: 14/06/2022</Text>
          <Text color="white">Hora de início: 20:29</Text>
          <Text color="white">Serviço: Passeio</Text>
          <Text color="white">Cliente: xxx-xxx</Text>
        </VStack>
        <ModalCancel visible={visible}>
          <View style={styles.modalCard}>
            <Text style={[styles.textStyle, { fontSize: 20 }]}>
              Tem certeza que deseja cancelar?
            </Text>
            <Text style={[styles.textStyle, { fontSize: 15 }]}>
              *Punições poderão ser aplicadas segundo os termos de serviço
            </Text>
            <ServiceButton
              title="Sim"
              color={colors.cyan[700]}
              nextPage={cancelService}
            />
            <ButtonNativeBase
              borderWidth={1}
              borderColor={colors.red[700]}
              bg="transparent"
              my={1}
              rounded={20}
              _pressed={{ bg: 'gray.100' }}
              onPress={() => setVisible(false)}
            >
              <Text color={colors.red[700]}>Cancelar</Text>
            </ButtonNativeBase>
          </View>
        </ModalCancel>
        <VStack mt={4}>
          <ServiceButton
            title="Começar serviço"
            color={colors.cyan[700]}
            nextPage={() => navigation.navigate('serviceInProgress')}
          />
          <ServiceButton
            title="Chat"
            color={colors.secondary[700]}
            nextPage={() => navigation.navigate('chat')}
          />
          <ButtonNativeBase
            borderWidth={1}
            borderColor={colors.red[700]}
            bg="transparent"
            my={1}
            rounded={20}
            _pressed={{ bg: 'gray.100' }}
            onPress={() => setVisible(true)}
          >
            <Text color={colors.red[700]}>Cancelar</Text>
          </ButtonNativeBase>
        </VStack>
      </VStack>
    </VStack>
  )
}

const styles = StyleSheet.create({
  ImageMap: {
    position: 'relative',
    zIndex: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.5
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(217,217,217,0.8)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalCard: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20
  },
  textStyle: {
    textAlign: 'center',
    marginVertical: 20
  }
})
