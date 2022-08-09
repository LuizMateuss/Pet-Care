import { useTheme } from 'native-base'
import { useEffect, useState } from 'react'
import { View, Text, Modal, StyleSheet } from 'react-native'
import { ServiceButton } from './ServiceButton'

export function ModalCancel({ visible, ...props }) {
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
      <View style={styles.modalContainer}>
        <View style={styles.modalCard}>
          <Text style={[styles.textStyle, { fontSize: 20 }]}>
            Tem certeza que deseja cancelar?
          </Text>
          <Text style={[styles.textStyle, { fontSize: 15 }]}>
            *Punições poderão ser aplicadas segundo os termos de serviço
          </Text>
          <ServiceButton title="Sim" color={colors.cyan[700]} />
          <ServiceButton
            onPress={() => setShowModal(false)}
            title="Não"
            color={colors.red[700]}
          />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
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
