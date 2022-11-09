import { ScrollView, VStack } from 'native-base'
import { Header } from '../components/Header'
import { useNavigation } from '@react-navigation/native'
import { RequestedServiceCard } from '../components/RequestedServiceCard'

export function ConfirmedServices({ route }) {
  const navigation = useNavigation()

  const { isCare, user } = route.params
  const mainColor = isCare ? '#00ABBC' : '#511AC7'
  return (
    <VStack>
      <Header title="Serviços confirmados" color={mainColor} />

      <ScrollView>
        <RequestedServiceCard
          name={isCare ? 'Nome tutor' : 'Nome cuidador'}
          status="Confirmado"
          image={require('../../assets/img/anonymous.png')}
          typeService="Passeio"
          dateService="14/06/2022"
          valueService={35}
          isCare={isCare}
          user={user}
        />
      </ScrollView>
    </VStack>
  )
}
