import { HStack, VStack, View, Text, ScrollView } from 'native-base'
import { Header } from '../components/Header'
import { HistoryCard } from '../components/HistoryCard'

export function HistoryCare({ route }) {
  const { isCare } = route.params
  const mainColor = isCare ? '#00ABBC' : '#511AC7'

  return (
    <VStack>
      <Header
        title={isCare ? 'Histórico' : 'Histórico do serviço'}
        color={mainColor}
      />

      <View>
        <ScrollView mb="60%">
          <HistoryCard
            name={isCare ? 'Nome tutor' : 'Nome cuidador'}
            image={require('../../assets/img/anonymous.png')}
            typeService="Hospedagem"
            dateService="11/08/2022"
            valueService={70}
            isCare={isCare}
          />
        </ScrollView>
      </View>
    </VStack>
  )
}
