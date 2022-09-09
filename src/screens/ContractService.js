import { HStack, VStack, View, Text, Image } from 'native-base'
import { Modal, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'
import { RatingBar } from '../components/RatingStar'
import { CaretLeft, PawPrint } from 'phosphor-react-native'
import { Button } from '../components/Button'
import { useNavigation } from '@react-navigation/native'

/*
  Tela contratar cuidador:
  -> Componente ModalCancel:
    -> showModal (bool), valor booleano, de acordo com a propriedade passada (visible), por padrão sempre é definido false.
    -> setShowModal (function), função responsável por alterar o valor do showModal.
    -> useEffect(), responsável por chamar a função toggleModal() sempre que a variável visible ter uma alteração.
*/

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

export function ContractService({ route }) {
  const [visible, setVisible] = useState(false)
  const navigation = useNavigation()
  const { isCare } = route.params
  return (
    <View flex={1} bg="white" mt={10}>
      <HStack
        bg="white"
        borderRadius={10}
        borderWidth={1}
        borderColor="primary.700"
        p={5}
        w="90%"
        mx="auto"
        alignItems="center"
      >
        <Image
          borderRadius={50}
          alt="Imagem cuidador"
          source={require('../../assets/img/anonymous.png')}
        />
        <VStack ml={5}>
          <Text>Nome do cuidador</Text>
          <RatingBar />
          <Text>Local: 1km de você</Text>
        </VStack>
      </HStack>

      <VStack mt={5}>
        <Text textAlign="center" fontSize={20}>
          Valor: R$40,00
        </Text>
        <Text textAlign="center" fontSize={20}>
          Selecione o método de pagamento
        </Text>
        <Button title="Pix" bg="#511AC7" w="80%" />
        <Text textAlign="center" w="80%" mx="auto" my={2}>
          Obs.: O valor será retido pelo aplicativo e será repassado ao cuidador
          após o serviço ser concluído.
        </Text>
      </VStack>

      <VStack
        bg="#511AC7"
        py={5}
        rounded={20}
        alignItems="center"
        w="90%"
        mx="auto"
      >
        <View p={4} rounded={40} bg="white">
          <PawPrint size={25} color="#511AC7" />
        </View>

        <View mt={2} alignItems="center">
          <Text color="white">Data agendada: 28/07</Text>
          <Text color="white">Horário de início: xx:xx</Text>
          <Text color="white">Horário de término: xx:xx</Text>
          <Text color="white">Serviço: Passeio</Text>
          <Text color="white">Cuidador: xxx-xxx</Text>
        </View>
      </VStack>
      <Button title="Desejar contratar?" bg="#511AC7" w="80%" my={5} />
      <HStack mx="auto">
        <View w="40%" mx={2}>
          <Button
            title="Sim"
            borderWidth={1}
            borderColor="#511AC7"
            color="#511AC7"
            w="100%"
            onPress={() => setVisible(true)}
          />
        </View>
        <View w="40%" mx={2}>
          <Button
            title="Não"
            borderWidth={1}
            color="#BC0000"
            borderColor="#BC0000"
            w="100%"
            onPress={() => navigation.goBack()}
          />
        </View>
      </HStack>
      <ModalCancel visible={visible}>
        <View bg="primary.700" w="80%" p={4} borderRadius={20}>
          <TouchableOpacity
            onPress={() => {
              setVisible(false)
              navigation.navigate('menuHamburguer', { isCare })
            }}
          >
            <CaretLeft size={20} color="#FFF" />
          </TouchableOpacity>
          <Text color="white" textAlign="center" my={5}>
            Serviço agendado com sucesso! Verifique com detalhes em “Serviços
            agendados”. Lembre-se de conversar com o cuidador para combinar como
            entregar o animal.
          </Text>
        </View>
      </ModalCancel>
    </View>
  )
}
