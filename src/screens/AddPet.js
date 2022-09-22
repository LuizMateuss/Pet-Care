import {
  VStack,
  Text,
  Image,
  HStack,
  Select,
  Radio,
  Modal,
  ScrollView,
  View
} from 'native-base'
import { CaretDown } from 'phosphor-react-native'
import LottieView from 'lottie-react-native'

import { useEffect, useState, TouchableOpacity } from 'react'

import { Button } from '../components/Button'
import { Header } from '../components/Header'
import { Input } from '../components/Input'

import { useNavigation } from '@react-navigation/native'

export function AddPet() {
  const [visible, setVisible] = useState(true)
  const [species, setSpecies] = useState('')
  const [race, setRace] = useState('')
  const [size, setSize] = useState('')
  const [gender, setGender] = useState('')
  const navigation = useNavigation()
  return (
    <VStack>
      <Header color="#511AC7" title="Adicionar animal" />

      <ScrollView h="75%">
        <Image
          alt="Imagem Pet"
          source={require('../../assets/img/PerfilAnimalImagem.png')}
          mx="auto"
          my={5}
        />
        <Text
          textAlign="center"
          color="#511AC7"
          fontWeight="black"
          fontSize={16}
        >
          Escolher imagem
        </Text>

        <HStack alignItems="center" justifyContent="center" w="100%" mx="auto">
          <Text
            textAlign="center"
            color="#511AC7"
            fontWeight="black"
            fontSize={18}
          >
            Nome:
          </Text>
          <Input ml={4} borderWidth={1} borderColor="#511AC7" w="60%" />
        </HStack>

        <VStack bg="primary.700" w="90%" p={4} borderRadius={10} mx="auto">
          <Text
            textAlign="center"
            color="white"
            fontWeight="black"
            fontSize={18}
          >
            Informações do animal
          </Text>
          <HStack alignItems="center" justifyContent="space-between" my={2}>
            <Text
              textAlign="center"
              color="white"
              fontWeight="black"
              fontSize={17}
            >
              Espécie:
            </Text>
            <Select
              placeholder="Escolha a espécie"
              accessibilityLabel="Escolha a espécie"
              minWidth="200"
              selectedValue={species}
              onValueChange={itemValue => {
                setSpecies(itemValue)
              }}
              bg="white"
            >
              <Select.Item label="Cachorro" value="cachorro" />
              <Select.Item label="Gato" value="gato" />
            </Select>
          </HStack>
          {species.length > 0 ? (
            <HStack alignItems="center" justifyContent="space-between" my={2}>
              <Text
                textAlign="center"
                color="white"
                fontWeight="black"
                fontSize={17}
              >
                {species.length > 0 ? 'Raça:' : ''}
              </Text>
              {species == 'cachorro' ? (
                <Select
                  placeholder="Escolha a raça"
                  accessibilityLabel="Escolha a raça"
                  minWidth="200"
                  selectedValue={race}
                  onValueChange={itemValue => {
                    setRace(itemValue)
                  }}
                  bg="white"
                >
                  <Select.Item label="Husky" value="husky" />
                  <Select.Item label="Labrador" value="labrador" />
                  <Select.Item label="Pastor Alemão" value="pastor_alemão" />
                </Select>
              ) : species == 'gato' ? (
                <Select
                  placeholder="Escolha a raça"
                  accessibilityLabel="Escolha a raça"
                  minWidth="200"
                  selectedValue={race}
                  onValueChange={itemValue => {
                    setRace(itemValue)
                  }}
                  bg="white"
                >
                  <Select.Item label="Siamês" value="siames" />
                  <Select.Item label="Persa" value="persa" />
                  <Select.Item label="Sphynx" value="sphynx" />
                </Select>
              ) : (
                <></>
              )}
            </HStack>
          ) : (
            <></>
          )}

          <HStack alignItems="center" justifyContent="space-between" my={2}>
            <Text
              textAlign="center"
              color="white"
              fontWeight="black"
              fontSize={17}
            >
              Peso aproximado:
            </Text>
            <Input w="40%" placeholder="Kg" />
          </HStack>
          <HStack alignItems="center" justifyContent="space-between" my={2}>
            <Text
              textAlign="center"
              color="white"
              fontWeight="black"
              fontSize={17}
            >
              Porte do animal:
            </Text>
            <Select
              placeholder="Selecione"
              accessibilityLabel="Selecione"
              minWidth="150"
              selectedValue={size}
              onValueChange={itemValue => {
                setSize(itemValue)
              }}
              bg="white"
            >
              <Select.Item label="Pequeno" value="pequeno" />
              <Select.Item label="Médio" value="medio" />
              <Select.Item label="Grande" value="grande" />
            </Select>
          </HStack>
          <HStack alignItems="center" justifyContent="space-between" my={2}>
            <Text
              textAlign="center"
              color="white"
              fontWeight="black"
              fontSize={17}
            >
              Gênero:
            </Text>
            <Radio.Group
              colorScheme="success"
              onChange={value => {
                setGender(value)
              }}
            >
              <Radio
                borderWidth={1}
                borderColor="white"
                bg="transparent"
                value="f"
                my="1"
              >
                <Text color="white">Fêmea</Text>
              </Radio>
              <Radio
                borderWidth={1}
                borderColor="white"
                bg="transparent"
                value="m"
                my="1"
              >
                <Text color="white">Macho</Text>
              </Radio>
            </Radio.Group>
          </HStack>
          <HStack alignItems="center" justifyContent="space-between" my={2}>
            <Text
              textAlign="center"
              color="white"
              fontWeight="black"
              fontSize={17}
            >
              Data de nascimento:
            </Text>
            <Input w="40%" placeholder="DD/MM/YYYY" />
          </HStack>
        </VStack>
        <Text
          textAlign="center"
          color="primary.700"
          fontWeight="black"
          fontSize={12}
          bg="#D6D6D6"
          w="90%"
          mx="auto"
          my={2}
          borderRadius={10}
        >
          Porte pequeno pode medir até 40 cm – sendo esse tamanho calculado
          desde as patas até os ombros do cão. Geralmente esses animais pesam
          até 10 kg. Médio porte possuem tamanho aproximado de 60 cm, pesando
          entre 15 e 25 kg. A partir dos 25kg, considera-se porte grande.
        </Text>
      </ScrollView>
      <Button
        mt={4}
        title="Adicional animal"
        color="primary.700"
        borderWidth={1}
        borderColor="primary.700"
      />
      <Modal isOpen={visible}>
        <View bg="primary.700" w="80%" p={4} borderRadius={20}>
          <LottieView
            source={require('../../assets/img/success.json')}
            autoPlay={true}
            style={{
              width: 200,
              height: 200
            }}
            resizeMode="cover"
          />
          <Text color="white" textAlign="center" my={5}>
            Animal adicionado com sucesso! Você pode agora procurar por
            cuidadores!
          </Text>
        </View>
      </Modal>
    </VStack>
  )
}
