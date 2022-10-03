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
import { TouchableOpacity } from 'react-native'
import { CaretDown } from 'phosphor-react-native'
import LottieView from 'lottie-react-native'

import { useEffect, useState } from 'react'

import { Button } from '../components/Button'
import { Header } from '../components/Header'
import { Input } from '../components/Input'

import { useNavigation } from '@react-navigation/native'

export function AddPet({ route }) {
  const [showModal, setShowModal] = useState(false)
  const [showAnimalSizeInfo, setShowAnimalSizeInfo] = useState(false)

  const [name, setName] = useState('')
  const [species, setSpecies] = useState('')
  const [race, setRace] = useState('')
  const [weight, setWeight] = useState('')
  const [size, setSize] = useState('')
  const [gender, setGender] = useState('')
  const [birth, setBirth] = useState('')
  const description = 'falta adicionar o componente para descrição do pet, com máximo de 200 caracteres'

  const navigation = useNavigation()
  const { isCare, user } = route.params

  async function addAnimal(){
    let birthday = birth.split('/')
    birthday = `${birthday[2]}-${birthday[1]}-${birthday[0]}`

    let req = await fetch(`${process.env.SERVER_LINK}registrationAnimal/${user.id}/${name}/${birthday}/${gender}/${weight}/${description}/${size}/${race}`,
      {
        method: process.env.SERVER_METHOD,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
    let res = await req.json()
    setShowModal(true)
  }
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
          <Input ml={4} borderWidth={1} borderColor="#511AC7" w="60%" onChangeText={setName}/>
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
              borderRadius={40}
            >
              <Select.Item label="Gato" value="1" />
              <Select.Item label="Cachorro" value="2" />
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
              {species == '2' ? (
                <Select
                  placeholder="Escolha a raça"
                  accessibilityLabel="Escolha a raça"
                  minWidth="200"
                  selectedValue={race}
                  onValueChange={itemValue => {
                    setRace(itemValue)
                  }}
                  bg="white"
                  borderRadius={40}
                >
                  <Select.Item label="Husky" value="104" />
                  <Select.Item label="Labrador" value="115" />
                  <Select.Item label="Pastor Alemão" value="136" />
                </Select>
              ) : species == '1' ? (
                <Select
                  placeholder="Escolha a raça"
                  accessibilityLabel="Escolha a raça"
                  minWidth="200"
                  selectedValue={race}
                  onValueChange={itemValue => {
                    setRace(itemValue)
                  }}
                  bg="white"
                  borderRadius={40}
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
            <Input w="40%" placeholder="Kg" onChangeText={setWeight}/>
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
            <TouchableOpacity>
              <Text
                color="primary.700"
                fontWeight="black"
                fontSize={15}
                bg="#C4C4C4"
                px={2}
                borderRadius={40}
                onPress={() => setShowAnimalSizeInfo(!showAnimalSizeInfo)}
              >
                ?
              </Text>
            </TouchableOpacity>
            <Select
              placeholder="Selecione"
              accessibilityLabel="Selecione"
              minWidth="150"
              selectedValue={size}
              onValueChange={itemValue => {
                setSize(itemValue)
              }}
              bg="white"
              borderRadius={40}
            >
              <Select.Item label="Pequeno" value="2" />
              <Select.Item label="Médio" value="3" />
              <Select.Item label="Grande" value="4" />
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
                value="F"
                my="1"
              >
                <Text color="white">Fêmea</Text>
              </Radio>
              <Radio
                borderWidth={1}
                borderColor="white"
                bg="transparent"
                value="M"
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
            <Input w="40%" placeholder="DD/MM/YYYY" onChangeText={setBirth}/>
          </HStack>
        </VStack>
        {showAnimalSizeInfo ? (
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
        ) : (
          <></>
        )}
      </ScrollView>
      <Button
        mt={4}
        title="Adicional animal"
        color="primary.700"
        borderWidth={1}
        borderColor="primary.700"
        onPress={() => addAnimal()}
      />
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content
          bg="primary.700"
          w="80%"
          p={4}
          borderRadius={20}
          alignItems="center"
        >
          <LottieView
            source={require('../../assets/img/success.json')}
            autoPlay={true}
            style={{
              width: 200,
              height: 200
            }}
            resizeMode="cover"
            loop={false}
          />
          <Text color="white" textAlign="center" my={5}>
            Animal adicionado com sucesso! Você pode agora procurar por
            cuidadores!
          </Text>
          <Button
            mt={4}
            title="Entendido!"
            w="100%"
            color="white"
            borderWidth={1}
            borderColor="white"
            onPress={() => {
              setShowModal(false)
              navigation.navigate('menuHamburguer', {
                screen: 'startPetCare',
                params: { isCare, user }
              })
            }}
          />
        </Modal.Content>
      </Modal>
    </VStack>
  )
}
