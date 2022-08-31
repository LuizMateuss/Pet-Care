import { ScrollView, View, Text } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { CaretLeft } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'
import { PetInfo } from '../components/PetInfo'
import { Button } from '../components/Button'
export function PetProfile() {
  const navigation = useNavigation()
  return (
    <View flex={1} bg="white" mt={8}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <CaretLeft size={26} color="#511AC7" />
      </TouchableOpacity>

      <ScrollView>
        <PetInfo
          petName="Bob"
          petWeight={7}
          petAge={2}
          petRace="Pastor alemão"
          petGender="Masculino"
        />
        <PetInfo
          petName="Thor"
          petWeight={9}
          petAge={3}
          petRace="Husky siberiano"
          petGender="Feminino"
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
      />
    </View>
  )
}
