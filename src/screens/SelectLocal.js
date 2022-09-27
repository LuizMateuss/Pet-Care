import { VStack, Text, Image, HStack } from 'native-base'
import { MagnifyingGlass } from 'phosphor-react-native'
import { Button } from '../components/Button'
import { Header } from '../components/Header'
import { Input } from '../components/Input'

export function SelectLocal() {
  return (
    <VStack bg="white" h="100%">
      <Header title="Selecionar local" color="#511AC7" />
      <Input
        w="70%"
        mx="auto"
        my={2}
        size="lg"
        borderColor="primary.700"
        borderBottomColor="primary.700"
        borderBottomWidth={1}
        borderRadius={0}
        placeholder="Inserir local..."
        InputLeftElement={<MagnifyingGlass size={24} color="#511AC7" />}
      />
      <Image
        mx="auto"
        h={250}
        borderRadius={10}
        alt="Mapa localização"
        source={require('../../assets/img/map_image.png')}
      />
      <VStack
        bg="white"
        borderWidth={1}
        borderColor="primary.700"
        borderRadius={40}
        w="80%"
        mx="auto"
        my={10}
        px={4}
        pb={4}
      >
        <Text
          bg="primary.700"
          borderRadius={40}
          fontWeight="black"
          fontSize={18}
          w="70%"
          mx="auto"
          color="white"
          textAlign="center"
          py={2}
          position="relative"
          bottom={5}
        >
          Local selecionado:
        </Text>
        <Text
          fontWeight="black"
          fontSize={16}
          color="primary.700"
          textAlign="center"
        >
          Rua Aletória Demais, Nº 666 - Ap. 11. CEP: 11545-111, Santos/SP.
        </Text>
      </VStack>
      <Text
        bg="primary.700"
        color="white"
        p={4}
        w="80%"
        mx="auto"
        fontSize={18}
        fontWeight="black"
        textAlign="center"
        borderRadius={40}
      >
        Solicitar serviço neste endereço?
      </Text>
      <HStack justifyContent="space-between" w="80%" mx="auto" mt={4}>
        <Button
          title="Sim"
          borderColor="primary.700"
          borderWidth={1}
          color="primary.700"
          px={4}
          w="40%"
        />
        <Button
          title="Não"
          borderColor="red.700"
          borderWidth={1}
          color="red.700"
          px={4}
          w="40%"
        />
      </HStack>
    </VStack>
  )
}
