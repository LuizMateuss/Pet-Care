import { HStack, VStack, View, Text, Image } from 'native-base'
import { ButtonMain } from '../components/ButtonMain'
import { RatingBar } from '../components/RatingStar'
import { PawPrint } from 'phosphor-react-native'
import { ServiceButton } from '../components/ServiceButton'
import { useNavigation } from '@react-navigation/native'

export function ContractService({ route }) {
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

      <VStack mt={10}>
        <Text textAlign="center" fontSize={20}>
          Informações do passeio:
        </Text>
        <Text textAlign="center" fontSize={20}>
          Valor: R$40,00
        </Text>
        <Text textAlign="center" fontSize={20}>
          Selecione sua forma de pagamento:{' '}
        </Text>
        <ButtonMain title="Pagamento" colorText="white" color="#511AC7" />
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
      <ButtonMain
        title="Desejar contratar?"
        colorText="white"
        color="#511AC7"
      />
      <HStack mx="auto">
        <View w="40%" mx={2}>
          <ServiceButton
            title="Sim"
            color="#511AC7"
            nextPage={() => navigation.navigate('startService', { isCare })}
          />
        </View>
        <View w="40%" mx={2}>
          <ServiceButton title="Sim" color="#BC0000" />
        </View>
      </HStack>
    </View>
  )
}
