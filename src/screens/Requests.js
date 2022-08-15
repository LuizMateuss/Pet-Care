import { ScrollView, VStack, Text } from 'native-base'
import { Header } from '../components/Header'
import { Order } from '../components/Order'

export function Requests() {
  return (
    <VStack>
      <Header title="Solicitações" color="#00ABBC" />

      <ScrollView>
        <Order />
        <Order />
        <Order />
        <Order />
        <Order />
        <Order />
      </ScrollView>
    </VStack>
  )
}
