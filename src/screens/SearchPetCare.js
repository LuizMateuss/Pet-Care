import { View, VStack, Text, ScrollView } from 'native-base'
import { CareCard } from '../components/CareCard'

export function SearchPetCare() {
  return (
    <View flex={1} pt={10} bg="white">
      <VStack>
        <View bg="primary.700" w="70%" mx="auto" p={2} borderRadius={50}>
          <Text
            textAlign="center"
            fontWeight="light"
            color="white"
            fontSize={20}
          >
            Passeio
          </Text>
        </View>
        <View bg="primary.700" w="70%" mx="auto" my={2} p={2} borderRadius={50}>
          <Text
            textAlign="center"
            fontWeight="light"
            color="white"
            fontSize={14}
          >
            Cuidadores disponíveis:
          </Text>
        </View>
        <View h="80%">
          <ScrollView>
            <CareCard />
            <CareCard />
            <CareCard />
            <CareCard />
            <CareCard />
            <CareCard />
            <CareCard />
            <CareCard />
          </ScrollView>
        </View>
      </VStack>
    </View>
  )
}
