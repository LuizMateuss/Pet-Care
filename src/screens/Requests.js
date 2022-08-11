import { ScrollView, VStack, Text } from 'native-base'
import { Header } from '../components/Header'
import { Order } from '../components/Order'

export function Requests() {
  return (
    <VStack>
      <Header title="Solicitações" />

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