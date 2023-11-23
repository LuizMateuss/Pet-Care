import { VStack, View, ScrollView } from 'native-base'
import { Header } from '../components/Header'
import { HistoryCard } from '../components/HistoryCard'

/*
  Histórico de serviços realizados/contratados
  -> Componente Header:
    -> Recebe um title (string), se for cuidador, será 'histórico', caso contrário será 'histórico do serviço'
    -> color (string), de acordo com a condição se for cuidador
  -> Componente HistoryCard:
    -> name (string), Nome do tutor/cuidador.
    -> image (string), imagem do usuário.
    -> typeService (string), tipo do serviço.
    -> dateService (string), data do serviço.
    -> valueService (number), valor do serviço.
    -> isCare (bool), se é cuidador ou não.
*/
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
