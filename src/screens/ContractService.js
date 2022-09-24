import {
  HStack,
  VStack,
  View,
  Text,
  Image,
  Modal,
  ScrollView
} from 'native-base'
import { TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'
import { RatingBar } from '../components/RatingStar'
import { CaretLeft, PawPrint } from 'phosphor-react-native'
import { Button } from '../components/Button'
import { useNavigation } from '@react-navigation/native'
import { Header } from '../components/Header'

export function ContractService({ route }) {
  const [showModal, setShowModal] = useState(true)
  const navigation = useNavigation()
  const { isCare, user } = route.params

  function onCloseModal() {
    setShowModal(false)
    navigation.navigate('menuHamburguer', {
      screen: 'startPetCare',
      params: { isCare, user }
    })
  }
  return (
    <View flex={1} bg="white">
      <Header title="Resumo do serviço" color="#511AC7" />
      <ScrollView h="90%">
        <HStack
          bg="white"
          borderRadius={10}
          borderWidth={1}
          borderColor="primary.700"
          p={5}
          w="90%"
          mx="auto"
          mt={5}
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

        <Text
          mt={5}
          bg="primary.700"
          color="white"
          textAlign="center"
          fontSize={20}
        >
          Valor do serviço: R$35,00
        </Text>
        <VStack w="80%" justifyContent="center" mx="auto">
          <Text textAlign="center" fontSize={20}>
            Selecione o método de pagamento
          </Text>
          <Button title="Mercado Pago" bg="#511AC7" w="50%" />
        </VStack>
        <VStack
          bg="white"
          borderWidth={1}
          borderColor="primary.700"
          borderRadius={40}
          w="80%"
          mx="auto"
          my={5}
          px={4}
          pb={4}
        >
          <Text
            bg="primary.700"
            borderRadius={40}
            fontWeight="black"
            fontSize={18}
            w="70%"
            mx="auto"
            color="white"
            textAlign="center"
            py={2}
            position="relative"
            bottom={5}
          >
            Local selecionado:
          </Text>
          <Text
            fontWeight="black"
            fontSize={16}
            color="primary.700"
            textAlign="center"
          >
            Rua Aletória Demais, Nº 666 - Ap. 11. CEP: 11545-111, Santos/SP.
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
          <Image
            alt="Imagem pet"
            source={require('../../assets/img/PerfilAnimalImagem.png')}
            w={70}
            h={70}
            borderRadius={50}
          />

          <View mt={2} alignItems="center">
            <Text color="white">Animal: Bob</Text>
            <Text color="white">Data agendada: 28/07</Text>
            <Text color="white">Horário de início: xx:xx</Text>
            <Text color="white">Horário de término: xx:xx</Text>
            <Text color="white">Serviço: Passeio</Text>
            <Text color="white">Cuidador: xxx-xxx</Text>
          </View>
        </VStack>
        <Button title="Deseja agendar o serviço?" bg="#511AC7" w="80%" my={5} />
        <HStack mx="auto" mb={5} w="90%" justifyContent="space-between">
          <Button
            title="Sim"
            borderWidth={1}
            borderColor="#511AC7"
            color="#511AC7"
            w="40%"
            onPress={() => setShowModal(true)}
          />

          <Button
            title="Não"
            borderWidth={1}
            color="#BC0000"
            borderColor="#BC0000"
            w="40%"
            onPress={() => navigation.goBack()}
          />
        </HStack>
        <Modal isOpen={showModal} onClose={onCloseModal}>
          <View bg="primary.700" w="80%" p={4} borderRadius={20}>
            <Text color="white" textAlign="center" my={5}>
              Serviço agendado com sucesso! Verifique com detalhes em “Serviços
              agendados”. Lembre-se de conversar com o cuidador para combinar
              como entregar o animal.
            </Text>
          </View>
        </Modal>
      </ScrollView>
    </View>
  )
}
