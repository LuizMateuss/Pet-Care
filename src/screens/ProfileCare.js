import { VStack, HStack, View, Text, ScrollView, useTheme } from 'native-base'
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import { CaretLeft, MapPin, User } from 'phosphor-react-native'

import { ProfileInfo } from '../components/ProfileInfo'

import { ButtonMain } from '../components/ButtonMain'

import { useNavigation } from '@react-navigation/native'

export function ProfileCare({ route }) {
  const { colors } = useTheme()

  const navigation = useNavigation()

  const { isCare } = route.params

  const mainColor = isCare ? '#00ABBC' : '#511AC7'
  return (
    <ScrollView bg="white" mt={8}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <CaretLeft size={26} color={mainColor} />
      </TouchableOpacity>

      <HStack alignItems="center" mx="auto" mb={4}>
        <Image
          style={styles.imageUser}
          source={require('../../assets/img/anonymous.png')}
        />
        <VStack ml={5}>
          <Text fontWeight="black" fontSize={20} color={mainColor}>
            Nome Usuário
          </Text>
          <Text fontWeight="black" fontSize={15} color={mainColor}>
            Editar perfil
          </Text>
        </VStack>
      </HStack>

      <View
        borderBottomWidth={1}
        borderColor={mainColor}
        w="70%"
        m="auto"
        my={2}
      ></View>

      <ProfileInfo
        icon={<MapPin size={26} color="#FFFFFF" />}
        title="Endereço"
        info="Rua Aletória Demais, Nº 666 - Ap. 11. CEP: 11545-111, Santos/SP."
        backgroundInfo={mainColor}
      />
      <ProfileInfo
        icon={<User size={26} color="#FFFFFF" />}
        title="Dados pessoais"
        info="Nome Completo: XXXXXXXX Data de nascimento: XX/XX/XXXX"
        backgroundInfo={mainColor}
      />

      <View mt={20}>
        <ButtonMain
          title="Logout"
          color={'transparent'}
          colorText={mainColor}
          nextPage={() => navigation.navigate('signIn')}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  imageUser: {
    borderRadius: 80,
    width: 100,
    height: 100
  }
})
