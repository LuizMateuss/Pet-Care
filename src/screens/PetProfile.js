import { ScrollView, View, Text } from 'native-base'
import { TouchableOpacity} from 'react-native'
import { CaretLeft } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'
import { PetInfo } from '../components/PetInfo'
import { Button } from '../components/Button'
import { useEffect, useState } from 'react'

export function PetProfile({ route }) {
  const navigation = useNavigation()
  const { isCare, user, newPet } = route.params

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
  useEffect(()=>{getPetInformations()},[newPet])

  return (
    <View flex={1} bg="white" mt={8}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <CaretLeft size={26} color="#511AC7" />
      </TouchableOpacity>

      <ScrollView>
        {pet.map((pet)=>
          <PetInfo
            key={pet.cd_animal}
            petName={pet.nm_animal}
            petWeight={pet.cd_peso_animal}
            petAge={pet.dt_nascimento_animal}
            petRace={pet.nm_raca_animal}
            petGender={pet.nm_genero_animal}
            onPress={() => navigation.navigate('editPet', { isCare, user, pet, newPet })}
          />
        )}
      </ScrollView>

      <View
        borderBottomWidth={1}
        borderColor="primary.700"
        w="70%"
        m="auto"
        my={5}
      ></View>
      <Button
        title="Adicional animal"
        color="white"
        backgroundColor="#511AC7"
        my={5}
        width="80%"
        margin="auto"
        onPress={() => navigation.navigate('addPet', { isCare, user, newPet })}
      />
    </View>
  )
}
