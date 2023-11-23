import { VStack, HStack, Text, Image } from 'native-base'
import { Button } from './Button'

export function SelectAnimalCard({
  animalName,
  animalAge,
  animalWeight,
  animalRace,
  animalGender,
  onSelect
}) {
  return (
    <VStack bg="primary.700" p={4} w="85%" mx="auto" my={2} borderRadius={10}>
      <Image
        alt="Imagem pet"
        source={require('../../assets/img/PerfilAnimalImagem.png')}
        w={100}
        h={100}
        borderRadius={50}
        mx="auto"
      />
      <Text
        textAlign="center"
        fontSize={18}
        fontWeight="black"
        color="white"
        mt={2}
      >
        {animalName}
      </Text>
      <HStack alignItems="center" justifyContent="space-between">
        <VStack>
          <Text fontSize={16} fontWeight="black" color="white">
            Peso
          </Text>
          <Text fontSize={16} fontWeight="black" color="white">
            Idade
          </Text>
          <Text fontSize={16} fontWeight="black" color="white">
            Raça
          </Text>
          <Text fontSize={16} fontWeight="black" color="white">
            Gênero
          </Text>
        </VStack>

        <VStack>
          <Text
            textAlign="right"
            fontSize={16}
            fontWeight="black"
            color="white"
          >
            {animalWeight} kg
          </Text>
          <Text
            textAlign="right"
            fontSize={16}
            fontWeight="black"
            color="white"
          >
            {animalAge} ano(s)
          </Text>
          <Text
            textAlign="right"
            fontSize={16}
            fontWeight="black"
            color="white"
          >
            {animalRace}
          </Text>
          <Text
            textAlign="right"
            fontSize={16}
            fontWeight="black"
            color="white"
          >
            {animalGender}
          </Text>
        </VStack>
      </HStack>
      <Button bg="white" color="#511AC7" title="Selecionar animal" onPress={onSelect}/>
    </VStack>
  )
}
