import { VStack, HStack, View, Text, ScrollView, Image } from 'native-base'
import { TouchableOpacity } from 'react-native'

import { CaretLeft, MapPin, User } from 'phosphor-react-native'

import { ProfileInfo } from '../components/ProfileInfo'

import { useNavigation } from '@react-navigation/native'
import { Button } from '../components/Button'

export function ProfileCare({ route }) {
  const navigation = useNavigation()

  const { isCare, userName, userId } = route.params

  const mainColor = isCare ? '#00ABBC' : '#511AC7'
  return (
    <ScrollView bg="white" mt={8}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <CaretLeft size={26} color={mainColor} />
      </TouchableOpacity>

      <HStack alignItems="center" mx="auto" mb={4}>
        <Image
          alt="Foto usuário"
          w={100}
          h={100}
          borderRadius={50}
          source={require('../../assets/img/anonymous.png')}
        />
        <VStack ml={5}>
          <Text fontWeight="black" fontSize={20} color={mainColor}>
            {userName}
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
      <Button
        title="Alterar senha"
        color={mainColor}
        borderWidth={1}
        borderColor={mainColor}
        width="80%"
        py={4}
        onPress={() => navigation.navigate('changePassword', { isCare, userId })}
      />

      <View mt="10%">
        <Button
          title="Logout"
          color={mainColor}
          borderWidth={1}
          borderColor={mainColor}
          width="80%"
          py={4}
          onPress={() => navigation.navigate('signIn', { isCare })}
        />
      </View>
    </ScrollView>
  )
}
