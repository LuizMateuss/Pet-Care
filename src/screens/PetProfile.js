import { ScrollView, View, Text } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { CaretLeft } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'
import { PetInfo } from '../components/PetInfo'
import { Button } from '../components/Button'
import { useEffect, useState } from 'react'
export function PetProfile({ route }) {
  const navigation = useNavigation()
  const { isCare, user } = route.params

  const [pet, setPet] = useState('')

  async function getPetInformations(){
    // const req = await fetch(
    //   `${process.env.SERVER_LINK}petInformations/${user.id}`,
    //   {
    //     method: process.env.SERVER_METHOD,
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json'
    //     }
    //   }
    // )
    // const res = await req.json()
    var res = new Array
    for (let i = 0; i < 3; i++) {
      res[i]={cd_id:i, cd_name:'nome'+i}
    }
    
    setPet([
      {
        id: res[0].cd_id,
        name: res[0].cd_name,
        // weight: res[0],
        // age: res[0],
        // race: res[0],
        // gender: res[0],
      },
      {
        id: res[1].cd_id,
        name: res[1].cd_name,
        // weight: res[0],
        // age: res[0],
        // race: res[0],
        // gender: res[0],
      }
    ])
    console.log(pet)
  }
  useEffect(()=>{getPetInformations()},[])

  return (
    <View flex={1} bg="white" mt={8}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <CaretLeft size={26} color="#511AC7" />
      </TouchableOpacity>

      <ScrollView>
        <PetInfo
          petName={pet[0].name}
          petWeight={7}
          petAge={2}
          petRace="Pastor alemão"
          petGender="Masculino"
          onPress={() => navigation.navigate('editPet', { isCare, user })}
        />
        <PetInfo
          petName={pet[1].name}
          petWeight={9}
          petAge={3}
          petRace="Husky siberiano"
          petGender="Feminino"
          onPress={() => navigation.navigate('editPet', { isCare, user })}
        />
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
        onPress={() => navigation.navigate('addPet', { isCare, user })}
      />
    </View>
  )
}
