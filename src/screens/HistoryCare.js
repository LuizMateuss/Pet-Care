import { HStack, VStack, View, Text, ScrollView } from 'native-base'
import { Header } from '../components/Header'
import { HistoryCard } from '../components/HistoryCard'

export function HistoryCare() {
  return (
    <VStack>
      <ScrollView>
        <Header title="Histórico" color="#00ABBC" />

        <HistoryCard
          name="Nome tutor"
          image={require('../../assets/img/anonymous.png')}
          typeService="Hospedagem"
          dateService="11/08/2022"
          valueService={70}
          isCare={true}
        />
      </ScrollView>
    </VStack>
  )
}
