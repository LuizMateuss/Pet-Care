import {
  HStack,
  VStack,
  View,
  Text,
  ScrollView,
  Image,
  Modal
} from 'native-base'
import { Info, MapPin } from 'phosphor-react-native'

import { Header } from '../components/Header'
import { Button } from '../components/Button'

import { useNavigation } from '@react-navigation/native'
import { AvaliationCard } from '../components/AvaliationCard'
import { RatingBar } from '../components/RatingStar'
import { useState } from 'react'

export function UserProfile({ route }) {
  const [showModal, setShowModal] = useState(false)
  const { isCare } = route.params

  const mainColor = isCare ? '#511AC7' : '#00ABBC'

  const navigation = useNavigation()

  return (
    <VStack bg="white" h="100%">
      <Header
        title={isCare ? 'Perfil do tutor' : 'Perfil do cuidador'}
        color={mainColor}
      />
      <VStack bg={mainColor} p={5} alignItems="center">
        <Image
          w={100}
          h={100}
          mb={5}
          borderRadius={50}
          alt="Foto do tutor"
          source={require('../../assets/img/anonymous.png')}
        />
        <Text mb={1} fontWeight="black" fontSize={16} color="white">
          {isCare ? 'Nome tutor' : 'Nome cuidador'}
        </Text>
        <RatingBar />
        <HStack mt={2}>
          <MapPin size={24} color="#FFFFFF" />
          <Text ml={5} fontSize={14} color="white">
            Santos, SP
          </Text>
        </HStack>
      </VStack>
      <VStack alignItems="center" m={5} borderRadius={20} bg={mainColor} px={4}>
        <HStack mt={2}>
          <Info size={24} color="#FFFFFF" />
          <Text ml={5} fontSize={14} color="white">
            Sobre mim
          </Text>
        </HStack>
        <Text py={4} fontSize={12} color="white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sedvelit
          urna. Nam ullamcorper eleifend cursus. Donec in sapien ante. Utdictum
          hendrerit justo, ac hendrerit quam volutpat quis.
        </Text>
      </VStack>
      {isCare ? (
        <View w="40%" mx="auto">
          <Button
            title="Chat"
            color={mainColor}
            borderWidth={1}
            borderColor={mainColor}
            w="80%"
            onPress={() => navigation.navigate('chat', { isCare })}
          />
        </View>
      ) : (
        <VStack>
          <Text
            textAlign="center"
            fontWeight="black"
            fontSize={18}
            color="secondary.700"
          >
            Avaliações recentes deste cuidador
          </Text>
          <View h="50%">
            <ScrollView>
              <AvaliationCard
                avaliationDescription="Foi minha primeira experiência em deixar meu filhote para eu poder
        viajar, e posso garantir que foi incrível, pois, ele ficou em excelentes
        mãos."
              />
              <AvaliationCard avaliationDescription="Foi a primeira vez que eu deixei o Ozzy com alguém. O cuidador foi incrível em sempre me mandar fotos e vídeos dele pra eu saber que tava tudo bem. Deu tudo certo! Com certeza recomendo ;)" />
            </ScrollView>
            <Button
              title="Procurar outro cuidador"
              color="red.700"
              bg="white"
              borderWidth={1}
              borderColor="red.700"
              onPress={() => setShowModal(true)}
            />
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
              <Modal.Content>
                <VStack bg="secondary.700" p={2}>
                  <Text
                    textAlign="center"
                    color="white"
                    fontSize={16}
                    fontWeight="black"
                  >
                    Realmente deseja procurar outro cuidador?
                  </Text>
                  <Text textAlign="center" color="white" fontSize={16}>
                    *Tarifas poderão ser aplicadas segundo os termos de serviço
                  </Text>
                  <VStack>
                    <Button w="100%" title="Sim" bg="red.700" color="white" />
                    <Button
                      w="100%"
                      title="Não"
                      bg="white"
                      color="secondary.700"
                      onPress={() => setShowModal(false)}
                    />
                  </VStack>
                </VStack>
              </Modal.Content>
            </Modal>
          </View>
        </VStack>
      )}
    </VStack>
  )
}
