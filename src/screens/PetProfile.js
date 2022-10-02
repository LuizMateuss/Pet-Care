import { ScrollView, View, Text } from 'native-base'
import { TouchableOpacity, SafeAreaView, VirtualizedList } from 'react-native'
import { CaretLeft } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'
import { PetInfo } from '../components/PetInfo'
import { Button } from '../components/Button'
import { useEffect, useState } from 'react'

export function PetProfile({ route }) {
  const navigation = useNavigation()
  const { isCare, user } = route.params
  // const isCare = false
  // const user = {name:'I havw', id: 7}

  const [pet, setPet] = useState([{}])

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
  
  const getItem = (data, index) => (
    data[index]
    );
    
    const Item = ({petName, weight}) => (
        <PetInfo
        petName={petName}
        petWeight={weight}
        petAge={2}
        petRace="Pastor alemão"
        petGender="Masculino"
        onPress={() => console.log("oi")}
    />
  )

  return (
    <View flex={1} bg="white" mt={8}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <CaretLeft size={26} color="#511AC7" />
      </TouchableOpacity>

      <ScrollView>
        <SafeAreaView>
          <VirtualizedList
            data={pet}
            keyExtractor={item => item.cd_animal}
            renderItem={({ item }) => <Item petName={item.nm_animal} weight={item.weight}/>}
            getItemCount={()=>pet.length}
            getItem={getItem}
          />
        </SafeAreaView>
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
