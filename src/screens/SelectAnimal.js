import { VStack, Text, ScrollView } from 'native-base'
import { Header } from '../components/Header'
import { SelectAnimalCard } from '../components/SelectAnimalCard'

import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

export function SelectAnimal({ route }) {
  const navigation = useNavigation()
  const { user } = route.params

  const [pet, setPet] = useState([{cd_animal:0}])

  async function getPetInformations(){
    const req = await fetch(
      `${process.env.SERVER_LINK}petInformations/${user.id}`,
      {
        method: process.env.SERVER_METHOD,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
    const res = await req.json()
    setPet(res)
  }
  useEffect(()=>{getPetInformations()},[])

  async function savePet(pet){
    await AsyncStorage.setItem('@petcare:selectedPet', JSON.stringify(pet))
  }

  return (
    <VStack>
      <Header title="Selecionar animal" color="#511AC7" />
      <ScrollView h="85%">
        {pet.map((pet)=>
            <SelectAnimalCard
            key={pet.cd_animal}
            animalName={pet.nm_animal}
            animalAge={pet.dt_nascimento_animal}
            animalRace={pet.nm_raca_animal}
            animalWeight={pet.cd_peso_animal}
            animalGender={pet.nm_genero_animal}
            onSelect={() => {
                savePet(pet)
                navigation.navigate('searchPetCare', { user })
              }
            }
          />
        )}
      </ScrollView>
    </VStack>
  )
}
