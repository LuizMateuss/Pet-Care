import { VStack, HStack, View, Text, ScrollView, Image } from 'native-base'
import { TouchableOpacity } from 'react-native'

import { CaretLeft, MapPin, User } from 'phosphor-react-native'

import { ProfileInfo } from '../components/ProfileInfo'

import { useIsFocused, useNavigation } from '@react-navigation/native'
import { Button } from '../components/Button'
import { useEffect, useState } from 'react'
import { APIconnection } from '../api/connection';

export function ProfileCare({ route }) {
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const { isCare, user } = route.params

  const mainColor = isCare ? '#00ABBC' : '#511AC7'

  const [address, setAddress] = useState({})
  const [userInformations, setUserInformations] = useState({})

  async function getAddressInformations() {
    try{
      const res = await APIconnection(
        `/addressInformations/${user.id}`,
        null,
        'GET'
      )
  
      setAddress({
        street: res[0].nm_logradouro,
        houseNumber: res[0].cd_numero_rua,
        complement: res[0].nm_complemento,
        district: res[0].nm_bairro,
        zipCode: res[0].cd_cep,
        city: res[0].nm_cidade,
        uf: res[0].nm_uf
      })
      setUserInformations({
        email: res[0].nm_email,
        phone: res[0].cd_telefone
      })
    } catch(error){
      console.error(error)
    }
  }
  useEffect(() => {
    getAddressInformations()
  }, [isFocused])
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
            {user.name}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('editProfile', { isCare, user })}
          >
            <Text
              borderWidth={1}
              borderColor={mainColor}
              borderRadius={40}
              fontWeight="black"
              fontSize={15}
              color={mainColor}
              textAlign="center"
              px={4}
              py={2}
            >
              Alterar perfil
            </Text>
          </TouchableOpacity>
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
        icon={<User size={26} color="#FFFFFF" />}
        title="Dados pessoais"
        info={`Nome Completo: ${user.name}`}
        email={`E-mail: ${userInformations.email}`}
        phone={`Telefone: ${userInformations.phone}`}
        backgroundInfo={mainColor}
      />
      <ProfileInfo
        icon={<MapPin size={26} color="#FFFFFF" />}
        title="Endereço"
        info={`${address.street}, Nº ${address.houseNumber}${
          address.complement === '' || address.complement == null
            ? ' '
            : ',\nComp: ' + address.complement
        }.\nBairro: ${address.district}, CEP: ${address.zipCode}, ${
          address.city
        }/${address.uf}.`}
        backgroundInfo={mainColor}
      />
      <Button
        title="Alterar senha"
        color={mainColor}
        borderWidth={1}
        borderColor={mainColor}
        width="80%"
        py={4}
        onPress={() => navigation.navigate('changePassword', { isCare, user })}
      />

      <View mt="5%">
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
