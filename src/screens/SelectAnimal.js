import { VStack, Text, ScrollView } from 'native-base'
import { Header } from '../components/Header'
import { SelectAnimalCard } from '../components/SelectAnimalCard'

export function SelectAnimal() {
  return (
    <VStack>
      <Header title="Selecionar animal" color="#511AC7" />
      <ScrollView h="85%">
        <SelectAnimalCard
          animalName="Caramelo"
          animalAge="7"
          animalRace="Pastor alemão"
          animalWeight="2"
          animalGender="Macho"
        />
        <SelectAnimalCard
          animalName="Bob"
          animalAge="5"
          animalRace="Husky"
          animalWeight="3"
          animalGender="Macho"
        />
      </ScrollView>
    </VStack>
  )
}
