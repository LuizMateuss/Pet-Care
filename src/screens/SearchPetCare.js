import { useState } from 'react'
import {
  VStack,
  ScrollView,
  View,
  Image,
  Text,
  HStack,
  Modal
} from 'native-base'
import { useNavigation } from '@react-navigation/native'
import {
  CalendarBlank,
  CaretLeft,
  MagnifyingGlass
} from 'phosphor-react-native'
import { TouchableOpacity } from 'react-native'
import { Button } from '../components/Button'
import { Input } from '../components/Input'

export function SearchPetCare({ route }) {
  const [showModal, setShowModal] = useState(true)
  const { isCare, user } = route.params

  const navigation = useNavigation()
  return (
    <View flex={1} pt={10} bg="white">
      <ScrollView bg="white">
        <VStack>
          <HStack alignItems="center">
            <TouchableOpacity
              onPress={() => navigation.navigate('menuHamburguer', { isCare })}
            >
              <CaretLeft size={20} color="#511AC7" />
            </TouchableOpacity>

            <Text
              mx="auto"
              textAlign="center"
              fontWeight="black"
              color="white"
              fontSize={18}
              bg="primary.700"
              borderRadius={20}
              p={5}
            >
              Vamos encontrar o melhor cuidador disponível para você!
            </Text>
            <View p={2}></View>
          </HStack>

          <Text
            w="80%"
            mx="auto"
            textAlign="center"
            fontWeight="light"
            color="#511AC7"
            fontSize={20}
          >
            São 30 minutos de passeio e muita diversão para seu pet.
          </Text>
          <Button
            my={4}
            title="Selecionar animal"
            bg="#511AC7"
            w="70%"
            py={4}
            onPress={() => navigation.navigate('selectAnimal')}
          />
          <VStack bg="#f4f4f4">
            <Text
              textAlign="center"
              fontWeight="light"
              color="#000"
              fontSize={20}
            >
              Animal selecionado:
            </Text>
            <Text
              textAlign="center"
              fontWeight="black"
              color="#511AC7"
              fontSize={18}
            >
              Bob
            </Text>
          </VStack>
          <Button
            my={4}
            title="Selecionar local"
            bg="#511AC7"
            w="70%"
            py={4}
            onPress={() => navigation.navigate('selectLocal')}
          />
          <VStack bg="#f4f4f4" py={2}>
            <Text
              textAlign="center"
              fontWeight="light"
              color="#000"
              fontSize={20}
            >
              Local selecionado:
            </Text>
            <Text
              textAlign="center"
              fontWeight="black"
              color="#511AC7"
              fontSize={16}
            >
              Rua Aletória Demais, Nº 666 - Ap. 11. CEP: 11545-111, Santos/SP.
            </Text>
          </VStack>
          <Text
            textAlign="center"
            fontWeight="light"
            color="#000"
            fontSize={20}
          >
            Selecione uma data
          </Text>
          <Button
            my={4}
            title="Selecionar data"
            bg="#511AC7"
            w="70%"
            py={4}
            onPress={() => setShowModal(true)}
          />
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content
              bg="primary.700"
              w="80%"
              p={4}
              borderRadius={20}
              alignItems="center"
            >
              <Text
                color="white"
                fontSize={20}
                fontWeight="black"
                textAlign="center"
                my={2}
              >
                Insira uma data:
              </Text>
              <VStack>
                <HStack alignItems="center" justifyContent="space-between">
                  <Text color="white" fontSize={16} fontWeight="black">
                    Data:
                  </Text>
                  <Input
                    placeholder="00/00/0000"
                    ml={4}
                    w="60%"
                    maxLength={10}
                  />
                </HStack>
                <HStack alignItems="center" justifyContent="space-between">
                  <Text color="white" fontSize={16} fontWeight="black">
                    Horário:
                  </Text>
                  <Input placeholder="00:00" ml={4} w="60%" maxLength={5} />
                </HStack>
              </VStack>
              <Button
                title="Adicionar data"
                mt={4}
                w="100%"
                color="white"
                borderWidth={1}
                borderColor="white"
                onPress={() => setShowModal(false)}
              />
            </Modal.Content>
          </Modal>
          <Button
            title="Achar um cuidador"
            bg="#511AC7"
            w="70%"
            py={4}
            onPress={() =>
              navigation.navigate('selectPetCare', { isCare, user })
            }
          />
        </VStack>
      </ScrollView>
    </View>
  )
}
