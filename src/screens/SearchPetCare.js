import {
  VStack,
  ScrollView,
  View,
  Image,
  Text,
  Input,
  HStack
} from 'native-base'
import { useNavigation } from '@react-navigation/native'
import {
  CalendarBlank,
  CaretLeft,
  MagnifyingGlass
} from 'phosphor-react-native'
import { TouchableOpacity } from 'react-native'
import { Button } from '../components/Button'

export function SearchPetCare({ route }) {
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
