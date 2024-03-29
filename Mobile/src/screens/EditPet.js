import { VStack, Text, Image, HStack, Modal, View } from 'native-base'
import { Alert, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { Button } from '../components/Button'
import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { useNavigation } from '@react-navigation/native'
import { APIconnection } from '../api/connection';

export function EditPet({ route }) {
  const [showModal, setShowModal] = useState([false, ''])
  const { isCare, user, pet, newPet } = route.params
  const navigation = useNavigation()

  const [newPetName, setNewPetName] = useState('')
  const [newPetWeight, setNewPetWeight] = useState('')
  const [newPetDs, setNewPetDs] = useState(pet.ds_animal)

  async function deletePet(){
    try{
      await APIconnection(
        `/deletePet/${pet.cd_animal}`, 
        {},
        'DELETE'
      );
    }catch(error){
      console.error(error)
      Alert.alert("Desulpe!","Não foi possível deletar o seu animalzinho")
    }finally{
      let VerifyPet=!newPet
      nextPage(VerifyPet)
    }
  }

  function VerifyPetInformation(){
    let sendPetName, sendPetWeight, sendPetDs
    if(!newPetName)
      sendPetName=pet.nm_animal
    else
      sendPetName=newPetName
    if(!newPetWeight)
      sendPetWeight=pet.cd_peso_animal
    else
      sendPetWeight=newPetWeight
    if(newPetDs === ' ' || newPetDs === '')
      sendPetDs=null
    else
      sendPetDs=newPetDs
    updatePet(sendPetName, sendPetWeight, sendPetDs)
  }

  async function updatePet(petName, petWeight, petDescription){
    try{
      await APIconnection(
        `/updatePet/${pet.cd_animal}`, 
        {
          "petName": petName,
          "petWeight": petWeight,
          "petDescription": petDescription
        },
        'PUT'
      );
    }catch(error){
      console.error(error)
      Alert.alert("Desulpe!","Não foi possível realizar a alteração")
    }finally{
      let VerifyPet=!newPet
      nextPage(VerifyPet)
    }
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
        <Input w="60%" borderWidth={1} borderColor="#511AC7" placeholder={pet.nm_animal} onChangeText={setNewPetName}/>
      </HStack>
      <VStack bg="primary.700" p={4} borderRadius={10} w="95%" mx="auto" mt={4}>
        <Text fontWeight="black" textAlign="center" fontSize={16} color="white">
          Alterar informações do animal:
        </Text>
        <HStack alignItems="center" justifyContent="space-between">
          <Text fontWeight="black" fontSize={16} color="white">
            Peso aproximado (kg):
          </Text>
          <Input placeholder={`${pet.cd_peso_animal} kg`} w="40%" onChangeText={setNewPetWeight}/>
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
          <Input value={newPetDs} onChangeText={setNewPetDs}/>
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
              showModal[1] === 'excluir este' ? deletePet() : VerifyPetInformation()
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
