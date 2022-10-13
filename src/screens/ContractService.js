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
import LottieView from 'lottie-react-native'

export function ContractService({ route }) {
  const [showModal, setShowModal] = useState(false)
  const navigation = useNavigation()
  const { isCare, user } = route.params

  function onCloseModal() {
    setShowModal(false)
    navigation.navigate('menuHamburguer', {
      screen: 'startPetCare',
      params: { isCare, user }
    })
  }
  function closeModalAndGoToRequestedServices() {
    setShowModal(false)
    navigation.navigate('requestedServices', {
      isCare,
      user
    })
  }
  return (
    <View flex={1} bg="white">
      <Header title="Resumo do serviço" color="#511AC7" />
      <ScrollView h="90%">
        <Text
          color="primary.700"
          fontSize={16}
          fontWeight="black"
          textAlign="center"
          w="60%"
          m="auto"
        >
          O pagamento é realizado para o aplicativo e só é repassado ao cuidador
          após o término do serviço.
        </Text>
        <Text
          mt={5}
          p={4}
          bg="primary.700"
          color="white"
          textAlign="center"
          fontSize={20}
        >
          Valor do serviço: R$35,00
        </Text>

        <VStack
          bg="white"
          borderWidth={1}
          borderColor="primary.700"
          borderRadius={40}
          w="80%"
          mx="auto"
          my={8}
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
        <Button title="Realizar pagamento" bg="#511AC7" w="80%" my={5} />
        <Button
          onPress={() => setShowModal(true)}
          title="Concluir agendamento"
          bg="#511AC7"
          w="80%"
          my={5}
        />
        <Modal isOpen={showModal} onClose={onCloseModal}>
          <View
            bg="primary.700"
            w="80%"
            p={4}
            borderRadius={20}
            alignItems="center"
          >
            <LottieView
              source={require('../../assets/img/dogWalking.json')}
              autoPlay={true}
              style={{
                width: 200,
                height: 200
              }}
              resizeMode="cover"
              loop={true}
            />
            <Text color="white" textAlign="center" my={5} fontWeight="black">
              Serviço agendado com sucesso! Aguarde até que um cuidador aceite o
              serviço. Você vai receber uma notificação (lembre-se de ativar a
              permissão de notificações). Verifique com detalhes em “Serviços
              agendados”.
            </Text>
            <Button
              title="Serviços agendados"
              color="white"
              borderColor="white"
              borderWidth={1}
              w="100%"
              onPress={closeModalAndGoToRequestedServices}
            />
          </View>
        </Modal>
      </ScrollView>
    </View>
  )
}
