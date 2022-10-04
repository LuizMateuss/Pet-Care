import { VStack, Text, Image, HStack, Modal, View } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { Button } from '../components/Button'
import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { useNavigation } from '@react-navigation/native'

export function EditPet({ route }) {
  const [showModal, setShowModal] = useState([false, ''])
  const { isCare, user, pet, newPet } = route.params
  const navigation = useNavigation()

  async function deletePet(){
    console.log('del')
    await fetch(`${process.env.SERVER_LINK}deletePet/${pet.cd_animal}`,
      {
        method: process.env.SERVER_METHOD,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
    let VerifyPet=!newPet
    nextPage(VerifyPet)
  }

  async function updatePet(){
    console.log('up')
    // await fetch(`${process.env.SERVER_LINK}deletePet/${pet.cd_animal}/{petName}/{petWeight}/{petDescription}`,
    //   {
    //     method: process.env.SERVER_METHOD,
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json'
    //     }
    //   }
    // )
    let VerifyPet=!newPet
    nextPage(VerifyPet)
  }

  function nextPage(pet){
    let newPet=pet
    navigation.navigate('petProfile', { isCare, user, newPet })
  }
  return (
    <VStack>
      <Header title="Editar animal" color="#511AC7" />

      <Image
        alt="Imagem pet"
        source={require('../../assets/img/PerfilAnimalImagem.png')}
        mx="auto"
        mt={4}
      />
      <TouchableOpacity>
        <Text
          fontWeight="black"
          textAlign="center"
          fontSize={16}
          color="#511AC7"
        >
          Alterar imagem
        </Text>
      </TouchableOpacity>
      <Text fontWeight="black" textAlign="center" fontSize={18} color="#511AC7">
        {pet.nm_animal}
      </Text>
      <HStack
        alignItems="center"
        justifyContent="space-between"
        w="80%"
        mx="auto"
      >
        <Text fontWeight="black" fontSize={16} color="#511AC7">
          Alterar nome:
        </Text>
        <Input w="60%" borderWidth={1} borderColor="#511AC7" placeholder={pet.nm_animal}/>
      </HStack>
      <VStack bg="primary.700" p={4} borderRadius={10} w="95%" mx="auto" mt={4}>
        <Text fontWeight="black" textAlign="center" fontSize={16} color="white">
          Alterar informações do animal:
        </Text>
        <HStack alignItems="center" justifyContent="space-between">
          <Text fontWeight="black" fontSize={16} color="white">
            Peso aproximado:
          </Text>
          <Input placeholder={`${pet.cd_peso_animal} kg`} w="40%" />
        </HStack>
        <VStack>
          <Text
            fontWeight="black"
            textAlign="center"
            fontSize={16}
            color="white"
          >
            Descrição do animal (opcional):
          </Text>
          <Input placeholder={pet.ds_animal}/>
        </VStack>
      </VStack>
      <Button
        mt={10}
        title="Excluir animal"
        w="80%"
        color="red.700"
        borderWidth={1}
        borderColor="red.700"
        onPress={() => setShowModal([true, 'excluir este'])}
      />
      <Button
        mt={4}
        title="Salvar alterações"
        w="80%"
        color="primary.700"
        borderWidth={1}
        borderColor="primary.700"
        onPress={() => setShowModal([true, 'salvar as alterações deste'])}
      />
      <Modal isOpen={showModal[0]} onClose={() => setShowModal([!showModal[0], ''])}>
        <View w="80%" bg="white" p={5}>
          <Text textAlign="center" fontSize={20}>
            Tem certeza que deseja {showModal[1]} animal?
          </Text>
          {showModal[1] === 'excluir este' ?
            (
              <Text textAlign="center" fontSize={15} my={5}>
                Não será possível desfazer essa ação.
              </Text>
            )
            : 
            (
              <Text></Text>
            )
          }

          <Button
            title="Sim"
            color="cyan.700"
            borderWidth={1}
            borderColor="cyan.700"
            my={1}
            w="100%"
            onPress={() =>{
              showModal[1] === 'excluir este' ? deletePet() : updatePet()
            }
            }
          />
          <Button
            title="Não"
            color="red.700"
            borderWidth={1}
            borderColor="red.700"
            my={1}
            w="100%"
            onPress={() => setShowModal([false, ''])}
          />
        </View>
      </Modal>
    </VStack>
  )
}
