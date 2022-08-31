import { VStack, ScrollView, View, Image, Text, Input } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import {
  CalendarBlank,
  CaretLeft,
  MagnifyingGlass
} from 'phosphor-react-native'
import { TouchableOpacity } from 'react-native'
import { ServiceButton } from '../components/ServiceButton'

export function SearchLocalization({ route }) {
  const { isCare } = route.params

  const navigation = useNavigation()
  return (
    <View flex={1} pt={10} bg="white">
      <ScrollView bg="white">
        <VStack>
          <TouchableOpacity
            onPress={() => navigation.navigate('menuHamburguer', { isCare })}
          >
            <CaretLeft size={20} color="#511AC7" />
          </TouchableOpacity>
          <View w="70%" mx="auto" p={5} bg="primary.700" borderRadius={20}>
            <Text
              textAlign="center"
              fontWeight="black"
              color="white"
              fontSize={18}
            >
              Vamos encontrar o melhor cuidador disponível para você!
            </Text>
          </View>
          <View
            w="70%"
            mx="auto"
            mt={5}
            p={4}
            bg="primary.700"
            borderRadius={50}
          >
            <Text
              textAlign="center"
              fontWeight="light"
              color="white"
              fontSize={16}
            >
              São 30 minutos de passeio!
            </Text>
          </View>
          <Input
            w="70%"
            mx="auto"
            my={2}
            size="lg"
            borderColor="transparent"
            borderBottomColor="primary.700"
            borderRadius={0}
            placeholder="Inserir local..."
            InputLeftElement={<MagnifyingGlass size={24} color="#511AC7" />}
          />
          <Image
            mx="auto"
            h={250}
            borderRadius={10}
            alt="Mapa localização"
            source={require('../../assets/img/map_image.png')}
          />
          <Input
            w="70%"
            mx="auto"
            my={2}
            size="lg"
            borderColor="transparent"
            borderBottomColor="primary.700"
            borderRadius={0}
            placeholder="Insira uma data"
            InputLeftElement={<CalendarBlank size={24} color="#511AC7" />}
          />
          <ServiceButton
            title="Achar um cuidador"
            color="#511AC7"
            colorText="white"
            nextPage={() => navigation.navigate('searchPetCare', { isCare })}
          />
        </VStack>
      </ScrollView>
    </View>
  )
}
