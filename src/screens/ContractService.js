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
import AsyncStorage from '@react-native-async-storage/async-storage'

export function ContractService({ route }) {
  const [showModal, setShowModal] = useState(false)
  const [address, setAddress] = useState()
  const navigation = useNavigation()
  const { isCare, user, selectedPet, serviceDate } = route.params

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

  async function handleAddress() {
    const response = await AsyncStorage.getItem('@petcare:coords')
    setAddress(JSON.parse(response))
  }

  useEffect(() => {
    handleAddress()
  }, [])

  async function setService(){
    let formatedDate = serviceDate.year+'-'+serviceDate.month+'-'+serviceDate.day+' '+serviceDate.hour+':'+serviceDate.minute+':00'
    const req = await fetch(`${process.env.SERVER_LINK}setService/${selectedPet.cd_animal}/Serviço/${serviceDate}/S/45.20/12345678/77/Complemento`,
      {
        method: process.env.SERVER_METHOD,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
      ).catch(() => {
        setIsLoading(false)
        Alert.alert(
          'Desulpe!',
          'Estamos enfrentando problemas de conexão, por favor tente novamente mais tarde.'
      )
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
          w="90%"
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
          Valor do serviço: R$45,20
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
          {address ? (
            <Text
              textAlign="center"
              fontWeight="black"
              color="#511AC7"
              fontSize={16}
            >
              {address.formatted_address} 
            </Text>
          ) : (
            <Text
              textAlign="center"
              fontWeight="black"
              color="#511AC7"
              fontSize={16}
            >
              Nenhum endereço selecionado.
            </Text>
          )}
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
            <Text color="white">Animal: {selectedPet.nm_animal}</Text>
            <Text color="white">Data agendada: {serviceDate.day}/{serviceDate.month}/{serviceDate.year}</Text>
            <Text color="white">Horário de início: {serviceDate.hour}:{serviceDate.minute}</Text>
            <Text color="white">Horário de término: {serviceDate.hour+1}:{serviceDate.minute}</Text>
            <Text color="white">Serviço: Passeio</Text>
          </View>
        </VStack>
        <Button title="Realizar pagamento" bg="#511AC7" w="80%" my={5} />
        <Button
          onPress={() => {
            setService();
            setShowModal(true)
          }}
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
